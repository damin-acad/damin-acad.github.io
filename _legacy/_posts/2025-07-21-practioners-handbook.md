---
layout: distill
title: The Prompt Practitioner's Handbook - Heuristics for Better Industry Research
description: Effective LLM prompting for industry research isn't about perfect instructions—it's about applying battle-tested heuristics that consistently produce actionable insights. These practical principles transform generic AI interactions into focused research partnerships.
tags: llm bias evaluation objectivity generativeAI fair-AI, food for thought
category: industry
giscus_comments: true
date: 2025-07-21
featured: true

authors:
  - name: Danial Amin
    url: "https://linkedin.com/in/danial-amin"
    affiliations:
      name: Samsung Design Innovation Center, France

bibliography: 2025-07-21-practioners-handbook.bib

toc:
  - name: The Specificity Principle
  - name: The Constraint Framework
  - name: The Evidence Demand
  - name: The Iteration Protocol

# Styling for custom elements
_styles: >
  .key-insight {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 2rem 0;
  }
  .heuristic-box {
    background: #d4edda;
    border-left: 4px solid #28a745;
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 0.25rem;
  }
  .prompt-example {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.9em;
  }
---

After years of crafting prompts for industry reports across technology, finance, and engineering sectors, a pattern emerges: **the difference between mediocre and exceptional LLM research output isn't sophisticated prompt engineering. Rather, it's consistently applying simple heuristics that most people ignore.**

Great prompting for industry research follows predictable principles. While each project has unique requirements, the underlying heuristics remain constant. These aren't abstract theories but practical rules distilled from thousands of research interactions that consistently separate actionable insights from generic AI responses.

The best industry researchers using LLMs don't rely on prompt templates or complex frameworks. They internalize core heuristics that guide every interaction, ensuring that each prompt moves them closer to meaningful business intelligence rather than impressive-sounding fluff.

<div class="key-insight">
<strong>Core Truth:</strong> Effective research prompting is about constraint, not creativity. The best prompts severely limit what the LLM can say, forcing it to produce precise, evidence-backed insights rather than expansive generalities.
</div>

## The Specificity Principle

Generic prompts produce generic research. The most common mistake in industry research is asking LLMs for broad analysis when specific questions yield actionable answers.

**Instead of:** "Analyze the competitive landscape in renewable energy."<br>
**Try:** "Identify the three companies that gained the most market share in utility-scale solar installations in the US between 2022-2024, and explain their specific competitive advantages."

The specificity principle operates through three mechanisms:

**Narrow Scope**: Limit analysis to specific timeframes, geographies, or market segments<br>
**Precise Metrics**: Ask for exact numbers, percentages, or rankings rather than general trends<br>
**Concrete Examples**: Demand specific companies, products, or case studies rather than abstract categories

<div class="heuristic-box">
<strong>Heuristic #1:</strong> If your prompt could apply to any industry or time period, it's too generic. Good research prompts contain at least three specific constraints that narrow the scope to actionable intelligence.
</div>

### The Context Sandwich Method

Effective research prompts sandwich the core question between relevant context and output constraints:

<div class="prompt-example">
Context: "The pharmaceutical industry is facing increased pressure from generic competition and regulatory scrutiny on drug pricing."

Core Question: "What are the top three strategic responses large pharma companies have implemented in the past 18 months to maintain profitability?"

Output Constraint: "For each strategy, provide: the specific companies using it, measurable outcomes where available, and implementation challenges they've faced."
</div>

This structure ensures the LLM understands the business context while preventing rambling responses that lack specificity.

## The Constraint Framework

Constraints aren't limitations—they're focusing mechanisms that force LLMs to prioritize quality over quantity. The most effective research prompts impose multiple constraints that guide the response toward actionable insights.

### The Three-Layer Constraint System

**Format Constraints**: Specify exactly how you want information structured
- "Present findings as a ranked list with brief justifications"
- "Organize by geographic region with subsections for market drivers"
- "Use bullet points with quantified impacts where possible"

**Evidence Constraints**: Demand specific types of supporting information
- "Cite specific financial results or growth metrics"
- "Reference recent M&A activity or partnerships"
- "Include regulatory changes or policy impacts"

**Scope Constraints**: Define clear boundaries for the analysis
- "Focus only on public companies with >$1B revenue"
- "Limit to developments in the past 12 months"
- "Exclude early-stage startups and private companies"

<div class="heuristic-box">
<strong>Heuristic #2:</strong> The best research prompts feel restrictive. If your prompt gives the LLM too much freedom, you'll get creative writing instead of business intelligence.
</div>

### The Exclusion Technique

Explicitly stating what you don't want often produces better results than only stating what you do want:

<div class="prompt-example">
"Analyze supply chain disruptions in semiconductor manufacturing. Do NOT include: general COVID-19 impacts, theoretical future scenarios, or companies with <$100M revenue. DO focus on: specific bottlenecks, company-level responses, and measurable timeline impacts."
</div>

This prevents LLMs from defaulting to commonly discussed but less relevant information.

## The Evidence Demand

Industry research requires evidence-backed conclusions, not plausible-sounding speculation. The evidence demand principle ensures every claim can be traced to specific sources or verifiable information.

### The "According to" Requirement

Force the LLM to attribute claims to specific sources:

**Weak**: "The SaaS market is experiencing rapid growth."
**Strong**: "According to [specific report/data], SaaS revenue grew X% in [timeframe], driven by [specific factors]."

<div class="prompt-example">
"Identify emerging trends in fintech adoption among small businesses. For each trend, specify: the data source, sample size or methodology, timeframe of the study, and which specific business segments show strongest adoption."
</div>

### The Quantification Demand

Whenever possible, require numerical evidence:

- Market size figures with growth rates
- Adoption percentages with timelines
- Revenue impacts with year-over-year comparisons
- User base numbers with geographic breakdowns

<div class="heuristic-box">
<strong>Heuristic #3:</strong> If the LLM can't provide numbers, names, or dates to support a claim, the claim probably isn't valuable for industry research. Demand specificity at every assertion.
</div>

### The Source Separation Technique

Ask the LLM to distinguish between different types of evidence:

<div class="prompt-example">
"Separate your analysis into: (1) Data from industry reports and surveys, (2) Information from company financial filings, (3) Insights from executive interviews or statements, (4) Analysis from consulting firm research. Label each section clearly."
</div>

This helps evaluate the reliability and relevance of different information sources.

## The Iteration Protocol

Great industry research emerges through iterative refinement, not single perfect prompts. The iteration protocol treats each LLM response as a foundation for deeper investigation rather than a final answer.

### The Drill-Down Strategy

Start broad, then systematically narrow focus based on initial findings:

**Round 1**: "What are the major challenges facing electric vehicle manufacturers?"<br>
**Round 2**: "You mentioned battery supply constraints. Which specific materials are most problematic and why?"<br>
**Round 3**: "For lithium shortages specifically, which companies have developed alternative sourcing strategies?"

### The Contradiction Check

Actively test the reliability of LLM outputs by requesting contrary evidence:

<div class="prompt-example">
"You identified three growth drivers for cloud adoption. Now provide three factors that might slow or reverse this trend. Which evidence is stronger—the growth drivers or the limiting factors?"
</div>

### The Cross-Sector Validation

Verify insights by examining similar patterns in adjacent industries:

<div class="prompt-example">
"You've identified subscription fatigue in streaming services. Do similar patterns exist in SaaS, news media, or fitness apps? What does this suggest about the sustainability of subscription models generally?"
</div>

<div class="heuristic-box">
<strong>Heuristic #4:</strong> Never accept the first response as complete. The best insights emerge when you push the LLM to defend, refine, or contradict its initial analysis.
</div>

## Implementation Strategy

Applying these heuristics requires systematic practice rather than occasional use. The most effective approach involves developing standard question templates that embed these principles:

**For Market Analysis**: "In [specific market segment] during [timeframe], which [number] companies achieved [specific metric], what [measurable strategies] did they use, and what [quantified outcomes] resulted?"

**For Competitive Intelligence**: "Among [defined competitor set] in [geographic/product scope], what [specific competitive moves] occurred in [timeframe], with what [measurable impacts] on [specific metrics]?"

**For Trend Analysis**: "What evidence from [source types] indicates [specific trend] is [strengthening/weakening] in [market segment] during [timeframe], and which [specific indicators] provide the strongest signal?"

The goal isn't perfect prompts but consistent application of focusing heuristics that transform generic LLM capabilities into sharp research tools. These principles work because they align with how business decisions are actually made—based on specific, evidence-backed insights rather than general observations.

---

**The Bottom Line:** Effective LLM research prompting is a discipline, not an art. Master these four heuristics—specificity, constraints, evidence demands, and iteration—and transform your industry research from impressive-sounding summaries into actionable business intelligence.

**AI Attribution**: This article was written with the assistance of Claude, an AI assistant created by Anthropic, demonstrating the prompting principles it advocates.