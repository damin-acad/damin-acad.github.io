# frozen_string_literal: true
# Jekyll Generator: parse papers.bib and set site.data.publication_counts
# for use in publication count badges (journals, conferences, book chapters; published/in press vs in review).

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

    def parse_bib(site)
      scholar = site.config['scholar'] || {}
      source_dir = scholar['source'] || '/_bibliography/'
      bib_name = scholar['bibliography'] || 'papers.bib'
      bib_path = File.join(site.source, source_dir.to_s.gsub(%r{\A/}, ''), bib_name)

      return default_counts unless File.file?(bib_path)

      journals = 0
      conferences = 0
      book_chapters = 0
      published_or_press = 0
      in_review = 0

      current_type = nil
      current_note = nil
      in_note = false
      note_buffer = ''

      File.foreach(bib_path) do |line|

        if line =~ /\A\s*@(\w+)\s*\{/
          if current_type
            note_str = (current_note || note_buffer).to_s.downcase
            if note_str =~ /in\s+review/
              in_review += 1
            else
              published_or_press += 1
            end
          end

          raw_type = Regexp.last_match(1)
          current_type = raw_type.nil? ? nil : raw_type.to_s.downcase
          next if current_type.nil? || current_type.empty?

          if %w[article].include?(current_type)
            journals += 1
          elsif %w[inproceedings].include?(current_type)
            conferences += 1
          elsif %w[incollection inbook].include?(current_type)
            book_chapters += 1
          end

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

      if current_type
        note_str = (current_note || note_buffer).to_s.downcase
        if note_str =~ /in\s+review/
          in_review += 1
        else
          published_or_press += 1
        end
      end

      {
        'journals' => journals,
        'conferences' => conferences,
        'book_chapters' => book_chapters,
        'published_or_press' => published_or_press,
        'in_review' => in_review
      }
    rescue StandardError => e
      Jekyll.logger.warn 'PublicationCountsGenerator:', e.message
      default_counts
    end

    def default_counts
      {
        'journals' => 0,
        'conferences' => 0,
        'book_chapters' => 0,
        'published_or_press' => 0,
        'in_review' => 0
      }
    end
  end
end
