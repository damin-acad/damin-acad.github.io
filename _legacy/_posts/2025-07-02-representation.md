---
layout: distill
title: The Representation Crisis - How LLM-Based Synthetic Users Obscure Rather Than Illuminate User Understanding
description: The proliferation of LLM-generated synthetic users in design and research creates a fundamental crisis of representation that undermines the very purpose of user-centered design. This analysis exposes the clarity deficit inherent in synthetic user generation and its profound implications for design validity.
tags: synthetic-users llm user-research representation design-methodology
giscus_comments: true
date: 2025-07-02
featured: true

authors:
  - name: Danial Amin
    url: "https://linkedin.com/in/danial-amin"
    affiliations:
      name: Samsung Design Innovation Center, France

bibliography: 2025-07-02-representation.bib

toc:
  - name: The Synthetic Substitution Problem
  - name: The Epistemological Foundation Crisis
  - name: Clarity Deficits in Synthetic Generation
  - name: The Validity Paradox
  - name: Statistical Sophistication, Representational Poverty
  - name: The Feedback Loop Breakdown
  - name: Toward Representational Transparency
  - name: Implications for Design Practice

# Styling for custom elements
_styles: >
  .critical-insight {
    background: linear-gradient(135deg, #dc3545 0%, #6f1319 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 2rem 0;
  }
  .clarity-analysis {
    background: #f8d7da;
    border-left: 4px solid #dc3545;
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 0.25rem;
  }
  .representation-model {
    text-align: center;
    font-family: monospace;
    background: #f1f3f4;
    padding: 1rem;
    border-radius: 0.25rem;
    margin: 1.5rem 0;
  }
  .methodological-warning {
    background: #fff3cd;
    border-left: 4px solid #ffc107;
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 0.25rem;
  }
---

The rapid adoption of Large Language Model-generated synthetic users represents one of the most profound methodological shifts in user-centered design since the emergence of digital interfaces. Proponents herald these systems as democratizing user research, reducing costs, and accelerating design cycles. Critics dismiss them as shallow approximations that cannot capture the complexity of human experience. **Both perspectives miss the fundamental issue: synthetic users create a crisis of representational clarity that undermines the epistemological foundations of user-centered design.**

This analysis argues that the problem with LLM-based synthetic users extends far beyond questions of accuracy or authenticity. The core issue lies in what we term the **"clarity deficit"**—the systematic obscuring of the relationship between synthetic representations and actual user populations. This opacity creates a cascade of methodological problems that threaten the validity of design decisions, the integrity of user research, and ultimately, the quality of human-computer interaction.

The stakes of this analysis extend beyond academic methodology to practical design outcomes. When synthetic users replace or supplement real user research without adequate transparency about their representational basis, we risk creating what appears to be user-centered design while actually designing for algorithmic artifacts with unknown relationships to human needs, behaviors, and contexts.

<div class="critical-insight">
<strong>Central Thesis:</strong> LLM-based synthetic users suffer from fundamental clarity deficits that obscure their representational basis, creating an illusion of user understanding while systematically undermining the transparency, validity, and accountability that effective user-centered design requires.
</div>

## The Synthetic Substitution Problem

The contemporary enthusiasm for LLM-generated synthetic users reflects a seductive proposition: if we can generate user representations that appear realistic, comprehensive, and behaviorally plausible, why not use them to replace or supplement expensive, time-consuming traditional user research? This proposition, however, rests on a fundamental category error that conflates representational plausibility with representational validity.

### The Plausibility Trap

Modern LLMs excel at generating user profiles, personas, and behavioral scenarios that appear convincing to human evaluators. These synthetic users exhibit internal consistency, plausible demographic combinations, and coherent behavioral patterns that satisfy our intuitive expectations about human diversity and complexity. This plausibility creates what we term the **"coherence illusion"**—the mistaken belief that internally consistent synthetic users necessarily represent valid samples from real user populations.

The trap lies in conflating two distinct qualities:

**Narrative Coherence**: The internal consistency and plausibility of individual synthetic user profiles
**Representational Validity**: The accuracy with which synthetic users reflect actual user population characteristics, behaviors, and needs

LLMs optimize for narrative coherence because their training emphasizes generating plausible, consistent text. However, this optimization process has no inherent mechanism for ensuring representational validity—the correspondence between synthetic outputs and real-world user populations.

### The Substitution Gradient

The movement toward synthetic users occurs along a gradient of substitution that reveals the progressive erosion of empirical grounding:

**Supplemental Synthesis**: Using synthetic users to fill gaps in existing user research datasets
**Comparative Generation**: Creating synthetic users for comparison with real user data
**Exploratory Modeling**: Generating synthetic users to explore hypothetical user scenarios
**Primary Substitution**: Replacing traditional user research entirely with synthetic user generation

Each step along this gradient increases the distance between design decisions and actual user evidence, while simultaneously making that distance less visible to design teams and stakeholders.

<div class="clarity-analysis">
<strong>Transparency Crisis:</strong> As design teams move along the substitution gradient, the methodological basis for user understanding becomes increasingly opaque. Teams may believe they are practicing user-centered design while actually designing for synthetic artifacts with unknown relationships to real user populations.
</div>

### The Efficiency Seduction

The appeal of synthetic users often centers on efficiency arguments: they can be generated quickly, modified easily, and scaled infinitely without the logistical challenges of recruiting, compensating, and coordinating with real users. This efficiency, however, comes at the cost of what we term **"representational accountability"**—the ability to trace design decisions back to valid evidence about user needs and behaviors.

The efficiency gains from synthetic users create perverse incentives that can systematically degrade the quality of user understanding:

- **Volume Over Validity**: Teams may prioritize generating large numbers of synthetic users over ensuring their representational accuracy
- **Convenience Over Complexity**: Synthetic users may be preferred precisely because they avoid the inconvenient complexities that real users introduce
- **Consistency Over Diversity**: LLM-generated users may exhibit artificial consistency that fails to capture the genuine variability of real user populations

## The Epistemological Foundation Crisis

To understand why synthetic users create representational clarity problems, we must examine the epistemological foundations of user-centered design—the ways in which designers justify knowledge claims about users and validate design decisions based on user evidence.

### The Empirical Commitment

User-centered design rests on a fundamental empirical commitment: design decisions should be grounded in valid evidence about actual user needs, behaviors, contexts, and preferences. This commitment implies several methodological requirements:

**Traceability**: Design decisions should be traceable to specific evidence about real users
**Falsifiability**: User research methods should be capable of disconfirming design assumptions
**Representativeness**: User evidence should represent the intended user population with known accuracy
**Transparency**: The basis for user understanding should be explicit and auditable

Traditional user research methods, despite their limitations, maintain clear connections to these epistemological foundations. Interviews, observations, and usability studies involve direct interaction with real users, creating traceable connections between evidence and conclusions.

### The Synthetic Severance

LLM-based synthetic users sever these epistemological connections in fundamental ways:

**Traceability Breakdown**: Synthetic user characteristics emerge from opaque algorithmic processes rather than observable user evidence
**Falsifiability Elimination**: Synthetic users cannot contradict design assumptions because they are generated to be plausible rather than accurate
**Representativeness Uncertainty**: The relationship between synthetic users and actual user populations remains unknown and often unknowable
**Transparency Deficit**: The basis for synthetic user characteristics is obscured within complex neural network architectures

<div class="representation-model">
Real Users → Observable Evidence → Design Decisions
     vs.
Training Data → LLM Processing → Synthetic Users → Design Decisions
</div>

This architectural difference has profound implications for the validity and accountability of design decisions based on synthetic user evidence.

### The Knowledge Status Confusion

Perhaps most problematically, synthetic users create confusion about the epistemological status of user knowledge. When design teams work with synthetic users, they may unconsciously treat synthetic characteristics as established facts about user populations rather than as algorithmic hypotheses requiring validation.

This confusion manifests in several ways:

**Assumption Reification**: Design assumptions embedded in synthetic user generation become treated as discovered user truths
**Validation Bypassing**: Teams may skip validation steps because synthetic users appear to provide comprehensive user understanding
**Confidence Inflation**: The detailed, consistent nature of synthetic users may create false confidence in user knowledge

## Clarity Deficits in Synthetic Generation

The central problem with LLM-based synthetic users lies not in their potential inaccuracy but in the systematic obscuring of their representational basis. This section analyzes the specific mechanisms through which synthetic user generation creates clarity deficits that undermine effective user understanding.

### The Provenance Opacity Problem

When LLMs generate synthetic users, the relationship between output characteristics and input training data becomes fundamentally opaque. Unlike traditional persona creation, where designers can trace persona characteristics back to specific user research findings, synthetic user characteristics emerge from complex, non-interpretable neural network processes.

This opacity creates several critical problems:

**Source Uncertainty**: Designers cannot determine whether specific synthetic user characteristics reflect real user patterns or algorithmic artifacts
**Bias Invisibility**: Systematic biases in synthetic user generation may be undetectable because the generation process is opaque
**Validation Impossibility**: Without understanding how characteristics are generated, teams cannot effectively validate synthetic user accuracy

Consider a concrete example: if a synthetic user exhibits strong preferences for voice interfaces over visual interfaces, designers cannot determine whether this preference reflects:
- Patterns in real user behavior captured in training data
- Algorithmic biases toward certain interface modalities
- Random variations in the generation process
- Implicit assumptions embedded in the prompt engineering

### The Aggregation Ambiguity

LLMs generate synthetic users through processes that aggregate patterns across vast training datasets. This aggregation process creates fundamental ambiguity about what synthetic users represent:

**Population Uncertainty**: Do synthetic users represent modal users, edge cases, or statistical composites that correspond to no real user population?
**Temporal Ambiguity**: Training data spans multiple time periods, creating synthetic users that may reflect outdated user patterns
**Cultural Conflation**: Global training data may generate synthetic users that blend cultural patterns in ways that correspond to no actual cultural context
**Context Collapse**: Synthetic users may combine behavioral patterns from different contexts in unrealistic ways

<div class="methodological-warning">
<strong>Representational Hazard:</strong> The aggregation processes that enable LLM synthetic user generation systematically obscure the relationship between synthetic characteristics and real user populations, creating representations that may be internally consistent but externally invalid.
</div>

### The Specification Sensitivity Problem

The characteristics of LLM-generated synthetic users depend heavily on the specific prompts, parameters, and generation contexts used. Small changes in specification can produce dramatically different synthetic user populations, yet these dependencies are rarely transparent to design teams.

**Prompt Dependency**: Different prompting strategies produce different synthetic user populations with no clear relationship to real user variability
**Parameter Sensitivity**: Model parameters significantly influence synthetic user characteristics in ways that are difficult to predict or control
**Context Effects**: The broader conversation or generation context influences synthetic user characteristics in subtle but important ways

This sensitivity means that synthetic user characteristics may reflect prompt engineering choices rather than user reality, yet this distinction is rarely visible to design teams using synthetic users.

### The Validation Circularity

Perhaps most problematically, validating synthetic users often requires the same user research that synthetic users purport to replace. Teams may attempt to validate synthetic users by:

- Comparing them to existing user research (which may be outdated or incomplete)
- Testing them with real users (which requires conducting the user research that synthetic users were meant to avoid)
- Cross-validating with other synthetic users (which compounds rather than resolves validation problems)

This circularity reveals the fundamental problem: synthetic users cannot provide independent validation of user understanding because they are generated from the same knowledge base that they purport to supplement or replace.

## The Validity Paradox

The adoption of synthetic users creates what we term the **"validity paradox"**: the more sophisticated and convincing synthetic users become, the more they obscure their own limitations and the more dangerous they become for design decision-making.

### The Sophistication Trap

As LLM capabilities advance, synthetic users become increasingly sophisticated, detailed, and convincing. This sophistication, however, does not necessarily correlate with increased validity or representational accuracy. Instead, sophistication may actively interfere with validity assessment by:

**Overwhelming Detail**: Highly detailed synthetic users may distract from questions about their representational basis
**Coherence Masking**: Internal consistency may obscure external invalidity
**Expertise Simulation**: Sophisticated synthetic users may appear to reflect expert user insights while actually reflecting algorithmic patterns

The result is that more sophisticated synthetic users may be more problematic than obviously artificial ones because they more effectively hide their limitations.

### The Uncanny Valley of User Research

Borrowing from robotics, we can identify an "uncanny valley" in synthetic user research where representations become sophisticated enough to seem real but not sophisticated enough to be valid. In this valley, synthetic users create several specific problems:

**False Confidence**: Teams develop confidence in user understanding based on sophisticated but invalid synthetic representations
**Validation Avoidance**: The apparent quality of synthetic users reduces motivation to conduct actual user research
**Assumption Reinforcement**: Sophisticated synthetic users may reinforce existing design assumptions rather than challenging them with real user complexity

### The Feedback Loop Deterioration

Valid user research depends on feedback loops between design hypotheses and user evidence. Real users can surprise, contradict, and educate design teams in ways that improve both user understanding and design quality. Synthetic users, by contrast, cannot provide genuine feedback because they are generated from existing knowledge rather than independent user reality.

This feedback loop deterioration manifests in several ways:

**Surprise Elimination**: Synthetic users cannot provide the unexpected insights that drive design innovation
**Assumption Confirmation**: Synthetic users may systematically confirm rather than challenge design assumptions
**Learning Stagnation**: Teams may stop learning about users because synthetic users provide the illusion of comprehensive user understanding

<div class="clarity-analysis">
<strong>Methodological Degradation:</strong> The validity paradox suggests that improvements in synthetic user sophistication may actually degrade rather than improve the quality of user understanding by making representational problems less visible while making design decisions based on invalid evidence more likely.
</div>

## Statistical Sophistication, Representational Poverty

A particularly insidious aspect of the synthetic user problem lies in the contrast between statistical sophistication and representational poverty. LLM-based synthetic users can exhibit remarkable statistical properties—demographic diversity, behavioral complexity, and population-level patterns—while remaining fundamentally disconnected from actual user populations.

### The Demographic Simulation Illusion

Modern LLMs can generate synthetic user populations that exhibit realistic demographic distributions, intersectional identities, and population-level statistical patterns. These capabilities create what appears to be sophisticated user representation:

- Synthetic users spanning realistic age, gender, income, and education distributions
- Intersectional identities that reflect real-world demographic complexity
- Behavioral patterns that correlate appropriately with demographic characteristics
- Population-level trends that mirror census data and survey research

However, this statistical sophistication masks fundamental representational poverty:

**Distribution Accuracy Without Individual Validity**: Synthetic populations may match real population statistics while individual synthetic users bear no relationship to real user characteristics
**Correlation Without Causation**: Synthetic users may exhibit realistic correlations between demographics and behaviors without reflecting the actual causal mechanisms that drive these relationships in real populations
**Surface Diversity Without Deep Difference**: Synthetic users may exhibit demographic diversity while failing to capture the deeper cultural, experiential, and contextual differences that demographic categories represent

### The Behavioral Modeling Mirage

LLMs can generate synthetic users with sophisticated behavioral patterns, preferences, and decision-making processes that appear to reflect genuine user complexity. These behavioral models may include:

- Consistent preference structures across multiple domains
- Realistic trade-offs between competing values and constraints
- Context-dependent behavior variations that seem authentic
- Learning and adaptation patterns that mirror human development

Yet this behavioral sophistication often represents a mirage rather than genuine behavioral modeling:

**Pattern Reproduction Without Understanding**: Synthetic users may reproduce behavioral patterns from training data without understanding the underlying psychological or contextual factors that drive these behaviors
**Coherence Without Correspondence**: Behavioral patterns may be internally coherent while bearing no systematic relationship to real user behavior
**Complexity Without Context**: Sophisticated behaviors may lack the contextual grounding that makes real user behavior meaningful and predictable

### The Validation Substitution Error

The statistical sophistication of synthetic users often leads to what we term the **"validation substitution error"**: teams may treat statistical plausibility as sufficient evidence for representational validity. This error manifests in several ways:

**Benchmarking Against Aggregates**: Teams may validate synthetic users by comparing them to population-level statistics rather than testing them against individual user reality
**Internal Consistency as External Validity**: The internal coherence of synthetic user populations may be mistaken for external correspondence with real user populations
**Methodological Sophistication as Empirical Adequacy**: The sophisticated methods used to generate synthetic users may be confused with the empirical adequacy of the resulting representations

<div class="representation-model">
Statistical Plausibility ≠ Representational Validity
Demographic Accuracy ≠ Individual Authenticity
Behavioral Coherence ≠ Behavioral Correspondence
</div>

## The Feedback Loop Breakdown

Effective user-centered design depends on robust feedback loops between design hypotheses and user evidence. These loops enable iterative refinement of both user understanding and design solutions. LLM-based synthetic users fundamentally disrupt these feedback mechanisms, creating what appears to be user-responsive design while actually creating closed-loop systems that respond only to algorithmic artifacts.

### The Echo Chamber Effect

When design teams rely primarily on synthetic users, they create an echo chamber where design assumptions are reflected back through algorithmic processes rather than challenged by real user evidence. This echo chamber operates through several mechanisms:

**Assumption Embedding**: Design assumptions influence synthetic user generation through prompt design and parameter selection
**Confirmation Amplification**: Synthetic users may systematically confirm design assumptions because they are generated from the same knowledge base that informed those assumptions
**Surprise Elimination**: Synthetic users cannot provide the unexpected insights and contradictions that real users frequently offer

The result is that teams may believe they are practicing iterative, user-responsive design while actually designing in isolation from real user evidence.

### The Validation Theater Problem

Synthetic users often enable what we term "validation theater"—processes that appear to validate design decisions against user evidence while actually providing no meaningful validation. This theater operates through several mechanisms:

**Pseudo-Testing**: Teams may "test" designs with synthetic users in ways that simulate user testing while providing no real user evidence
**Artificial Iteration**: Design iterations based on synthetic user feedback may create the appearance of user-responsive refinement while actually responding to algorithmic patterns
**False Falsification**: Synthetic users may appear to contradict design assumptions while actually reflecting different algorithmic patterns rather than real user evidence

### The Learning Degradation

Perhaps most problematically, reliance on synthetic users may systematically degrade teams' ability to learn from real users. This degradation occurs through several pathways:

**Intuition Atrophy**: Teams may lose the ability to recognize authentic user insights when they become accustomed to algorithmic user simulations
**Complexity Intolerance**: Real user complexity and contradiction may become frustrating after working with consistent synthetic users
**Empathy Reduction**: Sustained interaction with synthetic users may reduce teams' ability to empathize with real user experiences and constraints

<div class="methodological-warning">
<strong>Capability Degradation:</strong> Extended reliance on synthetic users may systematically degrade design teams' capacity for effective user research, user empathy, and user-responsive design iteration—the core competencies that enable successful user-centered design.
</div>

## Toward Representational Transparency

Addressing the clarity deficits inherent in LLM-based synthetic users requires systematic approaches to representational transparency that make the basis, limitations, and appropriate uses of synthetic users explicit and auditable.

### The Provenance Documentation Framework

Every synthetic user implementation should include comprehensive provenance documentation that specifies:

**Training Data Sources**: Clear documentation of the datasets, time periods, and population samples that inform synthetic user generation
**Generation Parameters**: Explicit specification of the prompts, model parameters, and generation contexts used to create synthetic users
**Validation Methods**: Description of how synthetic users have been validated against real user evidence, including both confirmatory and disconfirmatory tests
**Limitation Acknowledgments**: Explicit documentation of known limitations, biases, and uncertainty in synthetic user representations

This documentation should be accessible to all team members and stakeholders who use synthetic users for design decision-making.

### The Representational Uncertainty Quantification

Rather than presenting synthetic users as authoritative user representations, teams should systematically quantify and communicate representational uncertainty:

**Confidence Intervals**: Where possible, synthetic user characteristics should include confidence intervals that reflect uncertainty about real user population parameters
**Assumption Dependencies**: Clear documentation of how synthetic user characteristics depend on specific assumptions about user populations
**Validation Gaps**: Explicit identification of synthetic user characteristics that have not been validated against real user evidence
**Bias Assessments**: Systematic evaluation of potential biases in synthetic user generation and their implications for design decisions

### The Hybrid Validation Approach

Rather than treating synthetic users as substitutes for real user research, teams should develop hybrid approaches that use synthetic users to supplement and focus real user research:

**Hypothesis Generation**: Use synthetic users to generate hypotheses about user characteristics that can be tested with real user research
**Research Focusing**: Use synthetic users to identify specific questions and user segments that merit detailed investigation with real users
**Gap Identification**: Use synthetic users to identify potential gaps in existing user research that require additional empirical investigation
**Scenario Exploration**: Use synthetic users to explore hypothetical scenarios that can inform the design of real user research studies

### The Transparency Technology Stack

Implementing representational transparency requires technological infrastructure that makes synthetic user provenance and limitations visible throughout the design process:

**Metadata Systems**: Every synthetic user should include metadata that documents its generation parameters, validation status, and uncertainty levels
**Traceability Tools**: Design decisions based on synthetic users should be traceable back to their representational basis
**Uncertainty Visualization**: Design tools should visualize the uncertainty and limitation associated with synthetic user evidence
**Validation Tracking**: Systems should track which synthetic user characteristics have been validated against real user evidence and which remain unvalidated

<div class="clarity-analysis">
<strong>Transparency Imperative:</strong> Representational transparency is not optional for responsible synthetic user deployment—it is a fundamental requirement for maintaining the epistemic integrity of user-centered design in an era of algorithmic user representation.
</div>

## Implications for Design Practice

The representational clarity problems with LLM-based synthetic users have profound implications for how design teams should approach user research, validation, and decision-making in contemporary practice.

### The Methodological Hierarchy

Design teams should establish clear methodological hierarchies that prioritize evidence quality over evidence convenience:

**Primary Evidence**: Direct interaction with real users through interviews, observations, and usability studies
**Secondary Evidence**: Analysis of real user behavior through analytics, surveys, and existing research
**Tertiary Evidence**: Validated synthetic users with clear representational basis and documented limitations
**Exploratory Tools**: Unvalidated synthetic users used explicitly for hypothesis generation rather than decision-making

This hierarchy ensures that synthetic users supplement rather than replace more reliable forms of user evidence.

### The Validation-First Principle

Before using synthetic users for design decisions, teams should adopt a "validation-first" principle that requires:

**Empirical Grounding**: Synthetic users should be grounded in specific, recent user research rather than generated from general training data
**Targeted Validation**: Key synthetic user characteristics should be validated against real user evidence before informing design decisions
**Iterative Refinement**: Synthetic users should be iteratively refined based on ongoing real user research
**Limitation Acknowledgment**: Design decisions based on synthetic users should explicitly acknowledge representational limitations and uncertainty

### The Competency Maintenance Strategy

To prevent the degradation of user research capabilities, teams should implement competency maintenance strategies:

**Regular Real User Contact**: Team members should maintain regular, direct contact with real users regardless of synthetic user availability
**Validation Skill Development**: Teams should develop capabilities for validating synthetic users against real user evidence
**Critical Evaluation Training**: Team members should be trained to critically evaluate the limitations and appropriate uses of synthetic users
**Methodological Diversity**: Teams should maintain diverse user research methodologies rather than becoming dependent on synthetic user generation

### The Stakeholder Communication Protocol

When synthetic users inform design decisions, teams should implement clear communication protocols with stakeholders:

**Clarity About Evidence**: Stakeholders should understand when design decisions are based on synthetic versus real user evidence
**Limitation Communication**: The limitations and uncertainty associated with synthetic user evidence should be clearly communicated
**Validation Status**: Stakeholders should understand which synthetic user characteristics have been validated and which remain uncertain
**Risk Assessment**: The risks associated with design decisions based on unvalidated synthetic user evidence should be explicitly discussed

<div class="critical-insight">
<strong>Practice Transformation:</strong> Addressing the representational clarity crisis requires fundamental changes in design practice—not just technological improvements in synthetic user generation, but systematic transformation in how teams approach user evidence, validation, and decision-making.
</div>

## Conclusion: Reclaiming Representational Integrity

The proliferation of LLM-based synthetic users in design practice represents a methodological inflection point that will define the future of user-centered design. The choice facing the design community is not whether to use synthetic users—their adoption appears inevitable given their apparent convenience and sophistication. The choice is whether to use them transparently and responsibly, with full acknowledgment of their limitations, or to allow them to systematically undermine the representational integrity that effective user-centered design requires.

The analysis presented here reveals that the problem with synthetic users extends far beyond questions of accuracy or authenticity. The fundamental issue lies in the clarity deficits that obscure the relationship between synthetic representations and actual user populations. These deficits create cascading problems for design validity, accountability, and learning that threaten the foundational commitments of user-centered design.

**The path forward requires acknowledging several uncomfortable truths:**

First, synthetic users cannot provide the independent validation that effective user research requires. They are generated from existing knowledge rather than discovered through empirical investigation, making them inherently circular as sources of user evidence.

Second, the sophistication of synthetic users may actually increase rather than decrease their potential for harm by making their limitations less visible while making design decisions based on invalid evidence more likely.

Third, addressing these problems requires systematic transformation in design practice, not just technological improvement in synthetic user generation. Teams must develop new competencies in representational transparency, uncertainty quantification, and hybrid validation approaches.

The stakes of this methodological transformation extend beyond academic concerns to practical design outcomes. When synthetic users replace real user research without adequate transparency about their representational basis, we risk creating designs that serve algorithmic artifacts rather than human needs—a fundamental perversion of user-centered design principles.

The solution is not to abandon synthetic users entirely but to use them with the representational transparency and methodological rigor that responsible design practice requires. This means treating synthetic users as tools for hypothesis generation rather than substitutes for empirical validation. It means maintaining robust feedback loops with real users regardless of synthetic user availability. It means acknowledging uncertainty and limitation rather than claiming false authority for algorithmic representations.

Most fundamentally, it means preserving the empirical commitment that defines user-centered design: the commitment to ground design decisions in valid evidence about actual user needs, behaviors, and contexts. Synthetic users can support this commitment when used transparently and responsibly. They undermine it when they obscure their own limitations and substitute algorithmic convenience for empirical rigor.

The future of user-centered design depends on our ability to navigate this technological transition while preserving the representational integrity that makes user-centered design meaningful. This requires not just better synthetic users but better practices for using them—practices that honor the complexity of human experience and the difficulty of representing it accurately.

The representational crisis created by synthetic users is also an opportunity: an opportunity to develop more sophisticated approaches to user evidence, more transparent methods for handling uncertainty, and more robust frameworks for validating design decisions. Seizing this opportunity requires confronting the clarity deficits inherent in synthetic user generation and developing the methodological sophistication necessary to use these powerful tools responsibly.

The choice is ours: we can allow synthetic users to systematically degrade the quality of user understanding, or we can use this technological inflection point to develop more rigorous, transparent, and ultimately more effective approaches to user-centered design. The integrity of our field depends on choosing wisely.

---

*This analysis itself reflects the kind of critical evaluation that synthetic users cannot provide—the ability to challenge prevailing assumptions, identify systemic problems, and propose alternative approaches based on independent analysis rather than algorithmic optimization. These distinctly human capacities become more, not less, important as synthetic alternatives proliferate.*

---
*This work has been prepared in collaboration with a Generative AI language model (LLM), which contributed to drafting and refining portions of the text under the author’s direction.*