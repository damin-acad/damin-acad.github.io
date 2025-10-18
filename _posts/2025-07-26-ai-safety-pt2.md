---
layout: distill
title: Beyond the Safety Theater - What Real AI Safety Looks Like (Part 2)
description: With AI companies collectively failing basic safety standards while racing toward AGI, we need radical reforms that go far beyond voluntary pledges and self-assessment. Here's what genuine AI safety accountability would require—and why the industry won't adopt it voluntarily.
tags: generativeAI fair-AI ethics morality food-for-thought
category: industry
giscus_comments: true
date: 2025-07-26
featured: true

authors:
  - name: Danial Amin
    url: "https://linkedin.com/in/danial-amin"
    affiliations:
      name: Samsung Design Innovation Center, France

bibliography: 2025-07-26-ai-safety-pt2.bib

toc:
  - name: The End of Self-Regulation
  - name: Mandatory Third-Party Oversight
  - name: Whistleblowing That Actually Works
  - name: Real Existential Safety Planning
  - name: Global Coordination Beyond Culture Wars
  - name: The Economic Reality Check
  - name: What Success Would Look Like

# Styling for custom elements
_styles: >
  .solution-box {
    background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 2rem 0;
  }
  .action-box {
    background: #e7f3ff;
    border-left: 4px solid #0066cc;
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 0.25rem;
  }
  .reality-box {
    background: #f8f9fa;
    border-left: 4px solid #6c757d;
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 0.25rem;
  }
---

The diagnosis is clear from Part 1: the AI industry is systemically failing at safety while racing toward potentially catastrophic capabilities. But identifying the disease is only half the battle. The harder question is what genuine AI safety accountability would actually look like—and why the industry's current trajectory makes voluntary reform impossible.

**The brutal truth is that market incentives alone cannot solve AI safety.** When companies are competing to build AGI first in a winner-take-all market, safety measures that slow development become competitive disadvantages. The only solution is external constraint that applies equally to all players.

<div class="solution-box">
<strong>The Core Principle:</strong> Real AI safety requires independent oversight with enforcement power, mandatory transparency standards, and accountability mechanisms that can't be gamed by the companies themselves. Anything less is just safety theater with apocalyptic stakes.
</div>

## The End of Self-Regulation

The AI Safety Index results prove that self-regulation has failed catastrophically. Companies claiming to build AGI within the decade can't even achieve basic competency in safety planning, yet we're supposed to trust them to voluntarily constrain themselves when billions of dollars and civilizational influence hang in the balance.

**This is not a market failure—it's a predictable result of misaligned incentives.**

### Why Voluntary Standards Don't Work

The index reveals three fatal flaws in the self-regulatory approach:

**1. No Common Floor**: With no mandatory standards, companies adopt dramatically different safety practices. While Anthropic conducts human bio-risk trials, DeepSeek addresses "extreme jailbreak vulnerability" as an afterthought. This fragmentation creates a race to the bottom.

**2. No External Verification**: Even companies that claim to implement safety measures control their own evaluation and disclosure. The index found that methodologies linking evaluations to actual risks are "usually absent," and companies expect the public to trust self-reported safety claims.

**3. No Enforcement Mechanism**: When companies fail to meet their own safety commitments—like OpenAI's disbanded superalignment team or Meta's open release of frontier model weights without tamper-resistant safeguards—there are no consequences beyond bad press.

The predictable result: companies make safety pledges for public relations purposes while optimizing for development speed and competitive advantage.

### The Regulatory Imperative

Real safety requires external regulation with teeth. This means:

- **Mandatory safety standards** that apply to all frontier AI developers
- **Independent oversight bodies** with technical expertise and enforcement power
- **Severe financial penalties** for safety violations that make non-compliance economically irrational
- **Criminal liability** for executives who knowingly deploy unsafe systems

The nuclear industry provides a useful analogy. Nuclear power plants don't self-regulate their safety measures because the stakes are too high and the incentive structures too corrupted by commercial pressures. AI development with existential stakes requires similar external constraint.

<div class="action-box">
<strong>Immediate Action Required:</strong> Governments must establish AI safety regulators with the authority to shut down development projects that fail mandatory safety evaluations. Voluntary compliance has been tested and failed—external enforcement is the only remaining option.
</div>

## Mandatory Third-Party Oversight

The index's findings on external safety testing reveal just how shallow current industry practices are. Most companies don't conduct any meaningful third-party evaluation, and even those that do severely constrain what evaluators can test and publish.

**Real external oversight would be fundamentally different:**

### Independent Red-Team Requirements

Every frontier model would require mandatory evaluation by independent organizations with:

- **Full model access** including pre-safety-mitigation versions
- **Unlimited testing time** with adequate compute resources  
- **Complete editorial control** over findings publication
- **Legal protection** from company retaliation or lawsuits
- **Direct reporting** to regulatory authorities

The current system where companies like OpenAI can require NDAs and maintain "final say on what content goes in System Cards" is a mockery of independent evaluation.

### Standardized Evaluation Protocols

Instead of companies designing their own evaluations that conveniently avoid finding problems, we need standardized testing protocols developed by safety researchers and implemented by independent organizations.

These would include:
- **Dangerous capability evaluations** using state-of-the-art elicitation methods
- **Alignment stress tests** designed to detect deceptive behavior
- **Misuse potential assessments** across bio, cyber, and other high-risk domains
- **Control evaluation** to test whether companies can actually constrain their models

Most importantly, these evaluations would use **pre-established safety thresholds**. If a model exceeds dangerous capability levels without adequate safeguards, deployment stops—regardless of commercial pressures or development timelines.

### The Anthropic Example

Even Anthropic, the highest-scoring company, demonstrates the limitations of self-evaluation. Despite conducting the most comprehensive dangerous capability testing in the industry, expert reviewers noted that "the methodology/reasoning explicitly linking a given evaluation or experimental procedure to the risk, with limitations and qualifications, is usually absent."

If the industry leader can't clearly explain how their safety tests connect to actual risks, what hope do we have for meaningful safety evaluation across the industry?

<div class="reality-box">
<strong>Industry Reality:</strong> Companies will never voluntarily submit to external oversight that could delay or halt their development. Mandatory third-party evaluation must be legally required, not optional collaboration.
</div>

## Whistleblowing That Actually Works

The index's findings on whistleblowing reveal another systemic failure: employees at the companies building potentially world-changing technology have no meaningful way to raise safety concerns without risking their careers.

**This isn't just wrong—it's dangerous.** Internal employees are often the first to observe concerning model behaviors, safety culture degradation, or pressure to cut corners on risk management. When they can't speak safely, critical safety information never reaches decision-makers or the public.

### Protected Disclosure Rights

Real whistleblowing protection would include:

**Legal Immunity**: Employees who report safety concerns to regulators would be legally protected from retaliation, with severe penalties for companies that violate these protections.

**Financial Protection**: NDAs and non-disparagement agreements could not prevent safety-related disclosures, and companies could not withhold equity or severance based on safety reporting.

**Anonymous Reporting**: Secure, anonymous channels for reporting safety concerns directly to regulatory authorities, with investigation protocols that protect whistleblower identity.

**Affirmative Duty**: Senior employees would have a legal obligation to report safety violations, similar to corporate officers' fiduciary duties.

### The OpenAI Model—And Its Limitations

OpenAI is the only company that has published its whistleblowing policy, but even this minimal transparency came only after media reports exposed restrictive non-disparagement clauses. And the track record shows the limits of voluntary approaches:

- Multiple high-profile safety researchers have left citing safety culture concerns
- The superalignment team was disbanded after its leaders departed
- Former employees report pressure not to discuss safety concerns publicly

When even the most transparent company has this kind of track record, voluntary whistleblowing policies clearly aren't sufficient.

<div class="action-box">
<strong>Policy Solution:</strong> AI safety whistleblowing must be treated like financial fraud reporting—with legal protections, financial incentives for reporting violations, and severe penalties for companies that retaliate against safety reporting.
</div>

## Real Existential Safety Planning

The most damning finding in the entire index is that every company racing to build AGI received failing grades in existential safety planning. **This is not a technical problem—it's a governance failure of historic proportions.**

Companies claiming they will achieve human-level AI within years have no credible plan for ensuring those systems remain safe and controllable. This isn't responsible innovation—it's reckless endangerment at civilizational scale.

### Mandatory Safety Cases

Before any company can develop or deploy systems approaching human-level capabilities, they should be required to publish detailed safety cases demonstrating:

**Technical Control**: Formal proofs or high-confidence arguments that the system will remain aligned with human values and controllable even as capabilities increase.

**Containment Protocols**: Demonstrated ability to prevent unintended actions, unauthorized access, or misuse by malicious actors.

**Emergency Response**: Tested procedures for rapidly shutting down or constraining systems that exhibit unexpected behaviors.

**Risk Bounds**: Quantitative assessments showing catastrophic risk levels remain below acceptable thresholds.

### The Anthropic Standard—Still Insufficient

Even Anthropic, despite conducting world-leading alignment research and achieving the highest existential safety grade (still only a D), shows the inadequacy of current approaches. Reviewers noted their strategy's "over-reliance on mechanistic interpretability, given that the discipline is in an early stage."

If the industry leader's approach is probably insufficient, what does that say about everyone else's non-existent planning?

### Development Moratoria

Perhaps most importantly, companies that cannot demonstrate adequate safety controls should be legally prohibited from continuing development toward human-level capabilities. The right to build potentially dangerous technology is not absolute—it must be earned through demonstrated safety competence.

This would require:
- **Capability thresholds** beyond which development requires regulatory approval
- **Safety demonstrations** before permission to continue development
- **Ongoing monitoring** to ensure safety measures remain effective
- **Shutdown authority** for regulators when safety is compromised

<div class="solution-box">
<strong>The Non-Negotiable Principle:</strong> No company should be permitted to develop potentially catastrophic technology without demonstrating they can control it safely. This is not an innovation constraint—it's basic civilizational risk management.
</div>

## Global Coordination Beyond Culture Wars

The index's treatment of Chinese companies highlights a critical challenge: current AI safety frameworks are culturally biased and practically unenforceable across different regulatory environments.

**This fragmentation is dangerous.** AI development is a global competition, and safety standards that only apply in some jurisdictions create powerful incentives for regulatory arbitrage.

### International Safety Standards

Real AI safety requires international coordination similar to nuclear non-proliferation treaties:

**Common Technical Standards**: Agreed-upon evaluation protocols and safety thresholds that apply regardless of cultural or regulatory differences.

**Information Sharing**: Mandatory disclosure of dangerous capabilities and safety incidents across borders.

**Joint Oversight**: International bodies with authority to investigate safety violations and coordinate responses.

**Export Controls**: Restrictions on sharing advanced AI capabilities with entities that don't meet safety standards.

### Beyond Western-Centric Metrics

The current approach of evaluating all companies using Western corporate governance standards is both unfair and ineffective. Chinese companies operate under different regulatory frameworks and cultural norms around transparency.

But this doesn't mean lower safety standards—it means developing evaluation metrics that focus on outcomes rather than processes:

- **Demonstrated safety performance** rather than published policies
- **Technical controls** rather than governance structures  
- **Actual risk management** rather than disclosure transparency

The goal is global safety, not cultural imperialism disguised as safety policy.

<div class="reality-box">
<strong>Geopolitical Reality:</strong> AI safety cannot be achieved through national regulations alone. Without international coordination, safety standards become competitive disadvantages that incentivize development in less regulated jurisdictions.
</div>

## The Economic Reality Check

Perhaps the strongest argument against the reforms outlined above is economic: won't these requirements slow AI development and hurt competitiveness?

**This question reveals a profound misunderstanding of the stakes involved.**

### The True Cost of AI Accidents

The economic analysis of AI safety typically focuses on development costs while ignoring accident costs. But the potential downside of AI safety failures isn't just lost revenue—it's civilizational collapse.

Consider the economic implications:
- **Catastrophic misuse** could destabilize entire sectors of the economy
- **Loss of human control** could permanently end human economic agency
- **Social disruption** from rapid AI deployment could destroy existing institutions
- **International conflict** over AI capabilities could trigger global economic collapse

Against these potential costs, the price of mandatory safety measures looks like cheap insurance.

### Competitive Dynamics

The "competitiveness" argument also misses how level playing fields actually work. When safety requirements apply to all competitors equally, they don't disadvantage anyone—they simply change what companies compete on.

Instead of competing to be fastest to dangerous capabilities, companies would compete to be:
- **Most safety-competent** at achieving capabilities safely
- **Most innovative** at developing safety technologies
- **Most trusted** by regulators and the public
- **Most efficient** at meeting safety requirements

This shifts innovation toward safety-positive rather than safety-negative directions.

### The Insurance Model

Many high-risk industries already demonstrate how safety requirements can coexist with innovation and profitability. Airlines, nuclear power, pharmaceuticals, and financial services all operate under strict safety regimes while remaining economically viable.

The key is making safety costs predictable and universal rather than optional competitive disadvantages.

<div class="action-box">
<strong>Economic Reframe:</strong> The question isn't whether we can afford AI safety regulations—it's whether we can afford not to have them. The potential costs of AI accidents far exceed the costs of prevention.
</div>

## What Success Would Look Like

Imagine an alternative timeline where the AI Safety Index showed B+ grades across the board instead of the current D and F averages. What would that world look like?

### Technical Excellence

Companies would compete on the sophistication of their safety measures rather than the speed of their development:

- **Rigorous evaluation protocols** that actually connect to real-world risks
- **Robust alignment guarantees** backed by formal verification methods
- **Comprehensive red-teaming** by independent organizations with full access
- **Transparent reporting** of all safety-relevant findings and incidents

### Cultural Transformation

Safety would be a source of competitive advantage rather than competitive disadvantage:

- **Safety researchers** would be the highest-paid and most prestigious roles
- **Whistleblowing** would be celebrated as essential quality assurance
- **External oversight** would be welcomed as validation of company competence
- **Development delays** for safety reasons would be seen as responsible leadership

### Regulatory Framework

Governments would provide clear, enforceable standards rather than hoping for voluntary compliance:

- **Mandatory safety evaluations** before deployment authorization
- **Regular audits** by independent oversight bodies
- **Severe penalties** for safety violations that make non-compliance uneconomical
- **International coordination** to prevent regulatory arbitrage

### Public Trust

Most importantly, the public would have genuine confidence that AI development serves human interests:

- **Transparent processes** that allow external verification of safety claims
- **Accountable leadership** facing real consequences for safety failures
- **Democratic input** into the values and goals embedded in AI systems
- **Equitable benefits** that justify the risks of advanced AI development

## The Path Forward

The AI Safety Index has provided an invaluable service by documenting the scale of current safety failures. But documentation is only the first step. The next step is action.

**The window for voluntary reform has closed.** Companies have had years to demonstrate they can self-regulate responsibly, and the results speak for themselves. Every major AI developer is failing at basic safety competence while racing toward potentially catastrophic capabilities.

What we need now is:

1. **Immediate regulatory action** to establish mandatory safety standards
2. **International coordination** to prevent regulatory arbitrage  
3. **Independent oversight** with real enforcement power
4. **Protected whistleblowing** to ensure safety information reaches decision-makers
5. **Development constraints** that prevent reckless capability advancement

The AI industry will resist these changes because they threaten short-term profits and competitive positioning. But the alternative—continuing on the current trajectory—risks outcomes far worse than slower development or reduced profitability.

<div class="solution-box">
<strong>The Choice Before Us:</strong> We can either impose external constraints on AI development now, while we still have the power to do so, or we can hope that companies racing toward AGI will suddenly discover wisdom and restraint that they've shown no capacity for to date. The AI Safety Index shows which path we're currently on—and where it leads.
</div>

The scorecard is in. The industry is failing. And voluntary reform has proven impossible.

**The only question left is whether we'll act on what we know before it's too late.**

---

*This concludes our two-part analysis of the AI Safety Index and its implications for AI development. The data is clear, the risks are real, and the need for action is urgent. What happens next depends on whether policymakers, investors, and the public demand more than safety theater from the companies building our AI future.*

*Analysis based on the Future of Life Institute's AI Safety Index, Summer 2025 edition, available at futureoflife.org/index*