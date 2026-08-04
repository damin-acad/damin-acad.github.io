# Paper Assets Directory

This directory contains cover images and multimedia assets for academic papers.

## Directory Structure

```
assets/
├── img/papers/          # Paper cover images
├── pdf/posters/         # Poster PDFs
├── video/papers/        # Video presentations
└── audio/papers/        # Audio recordings
```

## File Naming Convention

### Cover Images
- Format: `{bibtex_key}.jpg` or `{bibtex_key}.png`
- Examples:
  - `amin2025generative_review.jpg`
  - `sethi2025lexical_diversity.png`

### Posters
- Format: `{bibtex_key}_poster.pdf`
- Examples:
  - `amin2025generative_review_poster.pdf`
  - `salminen2025llm_hci_poster.pdf`

### Videos
- Format: `{bibtex_key}_video.mp4` or `{bibtex_key}_presentation.mp4`
- Examples:
  - `amin2025generative_review_presentation.mp4`
  - `sethi2025lexical_diversity_video.mp4`

### Audio
- Format: `{bibtex_key}_audio.mp3` or `{bibtex_key}_podcast.mp3`
- Examples:
  - `amin2025generative_review_podcast.mp3`
  - `salminen2025llm_hci_audio.mp3`

## BibTeX Fields Added

Each paper entry now includes the following multimedia fields:

- `img={filename}` - Cover image filename
- `url_poster={URL}` - Link to poster PDF
- `url_video={URL}` - Link to video presentation
- `url_slides={URL}` - Link to presentation slides
- `url_code={URL}` - Link to code repository
- `url_data={URL}` - Link to dataset

## Usage Instructions

1. **Add Cover Images**: Place paper cover images in `assets/img/papers/` with the naming convention above
2. **Update BibTeX**: Fill in the empty URL fields in `_bibliography/papers.bib` with actual links
3. **Add Multimedia**: Place posters, videos, and audio files in their respective directories
4. **Update URLs**: Replace empty `url_*` fields with actual URLs or relative paths

## Example Entry

```bibtex
@article{amin2025generative_review,
  title={The Good, the Bad, and the Ugly of Generative AI in Personas},
  author={Amin, Danial and Salminen, Joni and Ahmed, Farhan and Tervola, M.H. Sonja and Sethi, Sankalp and Jansen, Bernard},
  journal={Conference on Human Computer Interaction'2026},
  year={2025},
  note={In review},
  bibtex_show={true},
  selected={true},
  abbr={CHI'2026},
  img={amin2025generative_review.jpg},
  url_poster={/assets/pdf/posters/amin2025generative_review_poster.pdf},
  url_video={https://youtube.com/watch?v=example},
  url_slides={https://slideshare.net/example},
  url_code={https://github.com/username/repo},
  url_data={https://zenodo.org/record/example}
}
```

## Notes

- Keep file sizes reasonable for web display
- Use high-quality images (300 DPI minimum for print)
- Ensure all URLs are accessible and up-to-date
- Consider using relative paths for local assets and absolute URLs for external resources
