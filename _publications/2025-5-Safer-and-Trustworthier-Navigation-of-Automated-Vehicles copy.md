---
title: "Safer and Trustworthier Navigation of Automated Vehicles"
collection: publications
category: conferences
permalink: /publication/2025-05-27-Safer-and-Trustworthier-Navigation-of-Automated-Vehicles
excerpt: 'A framework for safer and more trustworthy automated driving that combines robust object detection under adverse weather, risk-aware trajectory planning in camera networks, and template-based natural-language explanations for navigation decisions.'
date: 2025-05-27
venue: '2025 25th International Conference on Control Systems and Computer Science (CSCS)'
# slidesurl: 'https://academicpages.github.io/files/slides1.pdf'
paperurl: 'https://ieeexplore.ieee.org/abstract/document/11181605'
bibtexurl: 'https://eduardojsborges.github.io/files/paper_icinco_2024.bib'
citation: 'M. Aleksandrov, K. Yordanova, E. Borges, D. Soares, T. Barros and C. Premebida (2025). &quot;Safer and Trustworthier Navigation of Automated Vehicles.&quot; <i>25th International Conference on Control Systems and Computer Science (CSCS), Bucharest, Romania, 2025, pp. 183-189, doi: 10.1109/CSCS66924.2025.00035.</i>'
---
We propose a novel approach for safer and trustworthier automated vehicle navigation, which uses risk estimations to predict vehicle trajectories and generates navigation justifications for these trajectories. To increase the reliability of driving, we first use the latest YOLO11 model and adapt images from the KITTI dataset to include rain, fog, and evening effects, such as low lighting and high darkness, and then we train the model on the modified images to make it more robust to scene changes due to such weather and evening conditions. For this more robust model, we present functions that assign risk estimations to images taken from cameras associated with nodes in road networks. Based on these risk estimations, we design algorithms for the dynamic navigation of automated vehicles along low-risk network trajectories. In cases where risk estimations at network nodes and in network paths are too high, we describe methods that produce human-interpretable explanations of these risk values and recommend driving instructions.
