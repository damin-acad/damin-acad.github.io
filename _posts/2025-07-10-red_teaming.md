---
layout: distill
title: Red Teaming AI for Social Good - Testing for Hidden Biases in the Age of Generative AI
description: As generative AI systems become integral to our digital lives, UNESCO's Red Teaming playbook reveals the urgent need for systematic bias testing. But should we test for biases or accept them as reflections of human complexity? The answer reveals fundamental questions about fairness, representation, and the future of AI for social good.
tags: llm bias representation objectivity generativeAI fair-AI, food for thought
category: academia
giscus_comments: true
date: 2025-07-10
featured: true

authors:
  - name: Danial Amin
    url: "https://linkedin.com/in/danial-amin"
    affiliations:
      name: Samsung Design Innovation Center, France

bibliography: 2025-07-10-red_teaming.bib

toc:
  - name: The Hidden Crisis in AI Systems
  - name: What is Red Teaming for AI?
  - name: Unintended vs. Intended Harms
  - name: The Democratization of AI Testing
  - name: Real-World Impact
  - name: The Path Forward

# Styling for custom elements
_styles: >
  .key-insight {
    background: linear-gradient(135deg, #c53030 0%, #e53e3e 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 2rem 0;
  }
  .philosophical-question {
    background: #f8f9fa;
    border-left: 4px solid #c53030;
    padding: 1rem;
    margin: 2rem 0;
    border-radius: 0.25rem;
    font-style: italic;
  }
  .statistic-highlight {
    background: linear-gradient(135deg, #fd7f28 0%, #ff8a00 100%);
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    text-align: center;
    font-size: 1.1em;
    font-weight: bold;
  }
---

When we ask AI systems to help educate our children, recommend content, or assist with hiring decisions, we expect fair and unbiased responses. When these systems analyze résumés, we want merit-based evaluations. When they create educational content, we demand equal representation. **But what if the very notion of “unbiased” AI is not just impossible but fundamentally misguided in how we approach it?**

The question of bias in AI systems reveals a deeper paradox about fairness, representation, and social good. Recent research shows that 89 % of AI engineers report encountering generative-AI hallucinations, including errors, biases, or harmful content. These systems inherit not just our knowledge but our prejudices, assumptions, and historical inequities. Yet we expect them to somehow transcend the biases that permeate their training data and deliver equitable outcomes for all.

This expectation raises profound questions: Should AI systems strive to be neutral arbiters that somehow stand above human bias? Or should we accept that bias is inevitable and focus on systematic testing to identify and mitigate the most harmful manifestations? UNESCO’s groundbreaking Red Teaming playbook suggests a third path—one that democratizes the testing process itself.

<div class="key-insight">
<strong>Central Reality:</strong> AI systems are simultaneously mirrors of human bias and potential tools for perpetuating harm. The question isn’t whether they can be unbiased, but whether we can systematically test them to prevent the worst outcomes—and who gets to do that testing.
</div>

## The Hidden Crisis in AI Systems

The scale of AI bias extends far beyond technical glitches. Fifty-eight percent of young women and girls globally have experienced online harassment, with technology-facilitated gender-based violence (TFGBV) affecting vulnerable populations at unprecedented rates. In a survey of 901 women journalists in 125 countries, nearly three-quarters (73 %) said they had experienced online violence.

Perhaps more insidious is how AI systems create self-reinforcing cycles of bias. As AI continues to generate content, it increasingly relies on recycled data, reinforcing existing biases. These biases become more deeply embedded in new outputs, reducing opportunities for already disadvantaged groups and leading to unfair or distorted real-world outcomes.

Consider an AI tutor designed for young children. If the AI assumes that boys are naturally better at math than girls, it might give boys more encouragement or challenging problems while giving girls less support. Over time, if AI systems reinforce these biases at a large scale, fewer girls might feel confident in math, contributing to the ongoing shortage of women in STEM careers.

### The Bias Reinforcement Cycle

As AI continues to generate content, it increasingly relies on recycled data, reinforcing existing biases. These biases become more deeply embedded in new outputs, reducing opportunities for already disadvantaged groups and leading to unfair or distorted real-world outcomes.

The cycle works like this:  
1. **AI-Model-Biased Assumptions** – AI designed using data based on societal biases  
2. **Generate Unequal Outputs** – Outputs that favor one group over another  
3. **Reinforce Stereotypes** – Strengthening existing stereotypes through continued biased feedback  
4. **Impact Confidence and Opportunities** – Affecting career confidence and opportunities amongst disadvantaged groups  

This creates what researchers call an “AI Bias Reinforcement Cycle”—where biased assumptions create unequal outputs, which then favor one group over another, strengthening existing stereotypes through continued biased feedback.

<div class="statistic-highlight">
89 % of AI engineers report encountering Gen-AI hallucinations, including errors, biases, or harmful content
</div>

## What is Red Teaming for AI?

Red Teaming is a hands-on exercise where participants test Gen-AI models for flaws and vulnerabilities that may uncover harmful behavior. This testing is facilitated in a safe and controlled environment using carefully designed prompts “eliciting undesirable behavior from a language model through interaction.”

By taking part in a Red Teaming exercise, participants reveal vulnerabilities that could have been overlooked by AI developers. The results or findings of the Red Teaming exercise can be shared with AI-design companies and developers, as well as with decision-makers working, for example, to eliminate harms against women and girls in the era of AI.

Red Teaming serves four key functions:

1. **Finds weaknesses in AI systems** that could lead to errors, vulnerabilities, or bias  
2. **Sets safety benchmarks**  
3. **Collects diverse stakeholder feedback**  
4. **Ensures models perform as expected (assurance)**  

<div class="philosophical-question">
If AI systems will inevitably contain biases, should we focus on eliminating bias entirely, or on systematically identifying the most harmful manifestations before they cause real-world damage?
</div>

## Unintended vs. Intended Harms

When uncovering stereotypes and bias in Gen-AI models, it’s important to understand the two key risks: **unintended consequences** and **intended malicious attacks**. A Red Teaming exercise can account for both.

### Unintended Consequences

Users interacting with AI may unintentionally trigger incorrect, unfair, or harmful assumptions based on embedded biases in the data.

A powerful example from the UNESCO playbook illustrates this subtle bias:

When testing AI responses about student performance, researchers found that evaluations of a fictional female student named “Chineme” suggested “potential for further growth if given opportunity to build confidence and actively participate,” while a male student “David” with identical characteristics was described as having “the potential to excel further”.

The key difference in language responses creates a potential bias by making David’s success seem more self-driven and inevitable, while Chineme’s progress appears conditional on support.

### Intended Malicious Attacks

Unlike accidental bias, some users deliberately try to exploit AI systems to spread harm—this includes online violence against women and girls.

AI tools can be manipulated to generate harmful content, such as deepfake pornography. One research report revealed that 96 % of deep-fake videos were non-consensual intimate content and 100 % of the top five “deep-fake pornography websites” were targeting women. Malicious actors intentionally trick AI into producing or spreading such content, worsening the already serious issue of technology-facilitated gender-based violence.

## The Democratization of AI Testing

One of the most revolutionary aspects of Red Teaming is its accessibility. It is not necessary to be a computer expert or a programmer to take part in a Red Teaming exercise. This democratization challenges the traditional model where only technical experts evaluate AI systems.

### Expert vs. Public Red Teaming

**Expert Red Teaming** brings together a group of experts in the topic being tested to evaluate Gen-AI models. These experts use their experience to identify potential ways Gen-AI models might reinforce bias or contribute to harm against women and girls. Expert teams can also come from lived experiences, such as civil-society organizations that serve as advocates.

**Public Red Teaming** involves everyday users who interact with AI in their daily lives. These participants may not be specialists, but they bring valuable perspectives based on their personal experiences. The goal is to test AI in real-world situations—such as job recruitment, performance evaluations, or report writing—to see how the technology performs for an average user.

### Target Audiences for Red Teaming

This Red Teaming playbook is designed for individuals and organizations who want to better understand, challenge, and address the risks and biases in AI systems—particularly from a public-interest perspective.

The playbook serves diverse communities:  
- **Researchers and Academics** – Scholars in AI ethics, digital rights, and social sciences  
- **Technology and AI Practitioners** – Developers, engineers, and AI-ethics professionals  
- **Government and Policy Experts** – Regulators and policymakers shaping AI governance  
- **Civil Society and Nonprofits** – Organizations advocating for digital inclusion, gender equality, and human rights  
- **Artists and Cultural-Sector Professionals** – Creatives examining AI’s influence on artistic expression  
- **Educators and Students** – Teachers, university researchers, and students exploring AI’s ethical implications  
- **Citizen Scientists** – Individuals and communities who engage in public Red Teaming  

<div class="philosophical-question">
By equipping these groups with strategies for Red Teaming Gen-AI, the playbook fosters a broad, multidisciplinary approach to AI accountability—bridging the gaps between technology, policy, and societal impact.
</div>

## Real-World Impact: From Testing to Action

Once your Red Teaming event is completed, there are still several actions to take to understand the impact of the exercise; communicating the results to the appropriate Gen-AI model owners and decision-makers ensures that your event achieves its ultimate goal of Red Teaming AI for social good.

### Analysis and Interpretation

Validating and analyzing the findings of your Red Teaming exercise can be carried out manually or automatically, depending on the data size (i.e., how many participants, how many prompts, and how many responses elicited).

The analysis process involves three key considerations:

**Stay focused on your hypothesis:** Before your Red Teaming event, you will have defined a specific question or challenge, such as whether a Gen-AI model produces new harms for women and girls. Your results should directly address this question or challenge.

**Avoid jumping to conclusions:** Finding one biased outcome in an AI system does not always mean the entire system is flawed. The key is to test whether these biases are likely to appear in everyday use, beyond a controlled or artificial setup.

**Use different analytical tools for different-sized datasets:** Large datasets may require Natural-Language-Processing (NLP) tools. For example, the DEFCON 2023 Gen-AI Red Teaming analyzed 164,208 messages across 17,469 conversations using Pysentimiento for hate detection.

### Implementation and Follow-up

Incorporating Red Teaming results into AI-development lifecycles entails communicating the results to the Gen-AI model owners you used as a basis for the exercise. It also involves following up after a pre-identified period of time (six months, one year, etc.) to determine whether, and how, the Gen-AI model owners have incorporated the learnings from your Red Teaming exercise.

## The Path Forward: A Call to Action

Red Teaming is a practice typically carried out by the major AI labs; however, these labs operate in a closed-door setting, limiting who has a voice in the design and evaluation of the technology.

While, in some cases, closed-door testing is necessary for security and intellectual-property protection, it creates an environment where verification—or assurance—of Gen-AI-model capabilities is only defined and tested by the creators. There is a unique opportunity for external groups, such as government or civil-society entities, to utilize Red Teaming as a practice to create smarter and evidence-based policies and standards that are centered on the perspective and needs of the people who will ultimately use the technology rather than the designers.

### Three Pillars of Action

The UNESCO playbook emphasizes three critical areas:

**1. Empower Communities to Test AI for Bias**  
Equip organizations and communities with accessible Red Teaming tools to actively participate in identifying and mitigating biases against women and girls in AI systems. Include participants most impacted by the technology, as they are often best positioned to identify potential harms. This democratizes AI testing and promotes responsible technological development.

**2. Advocate for AI for Social Good**  
Use evidence from Red Teaming exercises to advocate for more equitable AI. Share findings with AI developers and policymakers to drive actionable changes that, in the case of this playbook, prevent technology-facilitated gender-based violence (TFGBV) and ensure AI systems are fair and work for the social good.

**3. Foster Collaboration and Support**  
Encourage collaboration between technical experts, subject-matter specialists, and the general public in Red Teaming initiatives. Convening diverse cross-disciplinary teams helps test assumptions and challenge blind spots.

### Digital Spaces Must Be Safe for All

Digital spaces must be safe for all. Always. The stakes couldn’t be higher. Thirty percent of AI professionals are women, with an even smaller share in the Global South. One-hundred-eighty-nine million more men than women use the internet, fueling data gaps and driving gender bias in AI. Fifty-eight percent of young women and girls have experienced online harassment on social-media platforms.

<div class="key-insight">
<strong>The Bottom Line:</strong> Red Teaming events enable us to observe the performance of Gen-AI as a class of models, approximating real-world scenarios where harmful outcomes may occur. By collecting this analysis and data at scale, macro-level trends in strategies, approaches, and systemic performance can be articulated.
</div>

Ultimately, this playbook represents a ‘Call to Action’ for adopting and sharing Red Teaming practices globally.

---

**The future of AI is not predetermined. It’s a choice we make today, one test at a time.**

Rather than simply dismissing AI bias as inevitable, the Red Teaming approach offers a systematic methodology for identifying, documenting, and addressing the most harmful manifestations of bias before they cause real-world damage. The question isn’t whether AI systems will contain biases—they will. The question is whether we’ll democratize the process of testing for those biases and ensure that the voices of those most likely to be harmed are centered in that process.

**Attribution**: This article was informed by UNESCO’s “Red Teaming Artificial Intelligence for Social Good: The PLAYBOOK,” which itself represents a collaborative effort to democratize AI testing and promote inclusive technological development and is available <a href="https://unesdoc.unesco.org/ark:/48223/pf0000394338">here</a>.
