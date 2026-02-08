# frozen_string_literal: true
# Jekyll Generator: parse papers.bib and set site.data.publication_counts
# for use in publication count badges (journals, conferences, book chapters; published/in press vs in review).

Jekyll::Hooks.register :site, :post_read do |site|
  scholar = site.config['scholar'] || {}
  source_dir = scholar['source'] || '/_bibliography/'
  bib_name = scholar['bibliography'] || 'papers.bib'
  bib_path = File.join(site.source, source_dir.gsub(%r{^/}, ''), bib_name)

  next unless File.file?(bib_path)

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
    # Start of entry: @article{key or @inproceedings{key etc.
    if line =~ /\A\s*@(\w+)\s*\{/
      # Save previous entry counts
      if current_type
        if %w[article].include?(current_type)
          journals += 1
        elsif %w[inproceedings].include?(current_type)
          conferences += 1
        elsif %w[incollection inbook].include?(current_type)
          book_chapters += 1
        end

        note_str = (current_note || note_buffer).to_s.downcase
        if note_str =~ /in\s+review/
          in_review += 1
        else
          published_or_press += 1
        end
      end

      current_type = Regexp.last_match(1).downcase
      current_note = nil
      in_note = false
      note_buffer = ''
      next
    end

    # note = { ... } (single line or start of multi-line)
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
    if %w[article].include?(current_type)
      journals += 1
    elsif %w[inproceedings].include?(current_type)
      conferences += 1
    elsif %w[incollection inbook].include?(current_type)
      book_chapters += 1
    end

    note_str = (current_note || note_buffer).to_s.downcase
    if note_str =~ /in\s+review/
      in_review += 1
    else
      published_or_press += 1
    end
  end

  site.data['publication_counts'] = {
    'journals' => journals,
    'conferences' => conferences,
    'book_chapters' => book_chapters,
    'published_or_press' => published_or_press,
    'in_review' => in_review
  }
end
