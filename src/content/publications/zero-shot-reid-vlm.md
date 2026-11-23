---
title: "Zero-Shot Semantic Re-Identification for Autonomous Driving: A VLM Baseline Study"
authors: ["E. Borges","M. Abreu","L. Garrote","U. J. Nunes"]
date: "2026-10-01"
venue: "2026 16th International Conference on Information Science and Technology (ICIST)"
venueShort: "ICIST"
summary: "This paper proposes a baseline study of a zero-shot pipeline using Vision-Language Models (VLMs) to generate textual descriptions of detected traffic participants and evaluate whether these descriptions can support identity matching across observations."
featured: true
thumbnail: "/images/ICIST_2026.webp"
citation: "@INPROCEEDINGS{borges2026zero,
  author={Borges, Eduardo and Abreu, Manuel and Garrote, Luís and Nunes, Urbano J.},
  booktitle={2026 16th International Conference on Information Science and Technology (ICIST)}, 
  title={Zero-Shot Semantic Re-Identification for Autonomous Driving: A VLM Baseline Study}, 
  year={2026},
  volume={},
  number={},
  pages={352-358},
  keywords={Modeling;Visualization;Pipelines;Printing;Autonomous driving;Conferences;Accuracy;Poles and zeros;Ranking (statistics);Learning (artificial intelligence);Object Re-Identification;Vision-Language Models;Autonomous Driving;Semantic Representation;Zero-Shot},
  doi={10.1109/ICIST71072.2026.11727753}}
"
paperUrl: "https://doi.org/10.1109/ICIST71072.2026.11727753"
---

Re-Identification (ReID) in autonomous driving is typically formulated as a visual matching problem, where observations of vehicles, pedestrians, and cyclists are associated across time, frames, or camera views using learned appearance embeddings, often complemented by motion, geometric, or multimodal cues. However, purely visual representations may be sensitive to viewpoint, occlusion, illumination, and sensor-domain variations, limiting their interpretability and robustness in complex driving scenes. We propose a baseline study of a zero-shot pipeline using Vision-Language Models (VLMs) to generate textual descriptions of detected traffic participants and evaluate whether these descriptions can support identity matching across observations. Instead of relying only on low-level visual similarity, the proposed formulation represents each object through structured semantic attributes, including category, color, shape, pose, visible parts, spatial context, and distinctive visual cues. This study provides an initial benchmark for language-based re-identification in autonomous-driving scenarios, discussing and evaluating the strengths and limitations of current VLMs for this task. Results demonstrate that zero-shot semantic descriptions can support effective object re-identification, achieving retrieval performance comparable to a supervised CNN baseline while offering greater interpretability through explicit identity cues. However, the experiments also reveal important challenges, including attribute inconsistency across viewpoints and limited fine-grained discrimination between visually similar instances.