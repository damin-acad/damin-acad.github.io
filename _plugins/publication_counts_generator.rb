# frozen_string_literal: true
# Jekyll Generator: parse papers.bib and set site.data.publication_counts
# Two-level counts: Published (incl. Accepted/in press) and In review, each with
# distribution by type (journal, conference, book chapter).

module Jekyll
  class PublicationCountsGenerator < Generator
    safe true
    priority :normal

    def generate(site)
      counts = parse_bib(site)
      site.data['publication_counts'] = counts
    rescue StandardError => e
      Jekyll.logger.warn 'PublicationCountsGenerator:', e.message
      site.data['publication_counts'] = default_counts
    end

    private

    def published?(note_str)
      return false if note_str.nil? || note_str.empty?
      n = note_str.downcase
      return false if n =~ /in\s+review/
      n =~ /published|accepted|in\s+press/
    end

    def type_category(raw_type)
      return nil if raw_type.nil? || raw_type.empty?
      t = raw_type.to_s.downcase
      return 'journal' if t == 'article'
      return 'conference' if t == 'inproceedings'
      return 'book_chapter' if %w[incollection inbook].include?(t)
      nil
    end

    def parse_bib(site)
      scholar = site.config['scholar'] || {}
      source_dir = scholar['source'] || '/_bibliography/'
      bib_name = scholar['bibliography'] || 'papers.bib'
      bib_path = File.join(site.source, source_dir.to_s.gsub(%r{\A/}, ''), bib_name)

      return default_counts unless File.file?(bib_path)

      # Two-level: published vs in_review, each with journal/conference/book_chapter
      published_journals = 0
      published_conferences = 0
      published_book_chapters = 0
      in_review_journals = 0
      in_review_conferences = 0
      in_review_book_chapters = 0

      current_type = nil
      current_note = nil
      in_note = false
      note_buffer = ''

      File.foreach(bib_path) do |line|
        if line =~ /\A\s*@(\w+)\s*\{/
          if current_type
            note_str = (current_note || note_buffer).to_s.strip
            category = type_category(current_type)
            next if category.nil?

            if published?(note_str)
              case category
              when 'journal' then published_journals += 1
              when 'conference' then published_conferences += 1
              when 'book_chapter' then published_book_chapters += 1
              end
            else
              case category
              when 'journal' then in_review_journals += 1
              when 'conference' then in_review_conferences += 1
              when 'book_chapter' then in_review_book_chapters += 1
              end
            end
          end

          raw_type = Regexp.last_match(1)
          current_type = raw_type.nil? ? nil : raw_type.to_s.downcase
          current_note = nil
          in_note = false
          note_buffer = ''
          next
        end

        if line =~ /\bnote\s*=\s*\{?\s*(.*)/
          in_note = true
          rest = Regexp.last_match(1)
          if rest =~ /\}(?:\s*,?\s*)?\s*$/
            current_note = rest.sub(/\}(?:\s*,?\s*)?\s*$/, '').strip
            in_note = false
          else
            note_buffer = rest.to_s.strip
          end
          next
        end

        if in_note
          if line =~ /\}\s*,?\s*$/
            note_buffer += ' ' + line.sub(/\}\s*,?\s*$/, '').strip
            current_note = note_buffer
            in_note = false
            note_buffer = ''
          else
            note_buffer += ' ' + line.strip
          end
        end
      end

      # Last entry
      if current_type
        note_str = (current_note || note_buffer).to_s.strip
        category = type_category(current_type)
        if category
          if published?(note_str)
            case category
            when 'journal' then published_journals += 1
            when 'conference' then published_conferences += 1
            when 'book_chapter' then published_book_chapters += 1
            end
          else
            case category
            when 'journal' then in_review_journals += 1
            when 'conference' then in_review_conferences += 1
            when 'book_chapter' then in_review_book_chapters += 1
            end
          end
        end
      end

      published_total = published_journals + published_conferences + published_book_chapters
      in_review_total = in_review_journals + in_review_conferences + in_review_book_chapters

      {
        'published_total' => published_total,
        'published_journals' => published_journals,
        'published_conferences' => published_conferences,
        'published_book_chapters' => published_book_chapters,
        'in_review_total' => in_review_total,
        'in_review_journals' => in_review_journals,
        'in_review_conferences' => in_review_conferences,
        'in_review_book_chapters' => in_review_book_chapters,
        # Legacy flat totals for any other use
        'journals' => published_journals + in_review_journals,
        'conferences' => published_conferences + in_review_conferences,
        'book_chapters' => published_book_chapters + in_review_book_chapters
      }
    rescue StandardError => e
      Jekyll.logger.warn 'PublicationCountsGenerator:', e.message
      default_counts
    end

    def default_counts
      {
        'published_total' => 0,
        'published_journals' => 0,
        'published_conferences' => 0,
        'published_book_chapters' => 0,
        'in_review_total' => 0,
        'in_review_journals' => 0,
        'in_review_conferences' => 0,
        'in_review_book_chapters' => 0,
        'journals' => 0,
        'conferences' => 0,
        'book_chapters' => 0
      }
    end
  end
end
