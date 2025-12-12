---
title: "The Impact of Loss Functions and Architectures in Object Re-Identification: A Comparative Study"
collection: publications
category: conferences
permalink: /publication/2025-11-12-The-Impact-of-Loss-Functions-and-Architectures-in-Object-Re-Identification-A-Comparative-Study
excerpt: 'A comprehensive evaluation of loss functions and backbone architectures for RGB and depth-based object re-identification on the KITTI-ReID dataset, highlighting the strengths of transformer models and contrastive losses for robust MOT pipelines.'
date: 2025-11-12
venue: '24th International Conference on Robotics, Automation and Mobile Robotics (ROBOT)'
# slidesurl: 'https://academicpages.github.io/files/slides1.pdf'
# paperurl: 'https://ieeexplore.ieee.org/abstract/document/11181605'
# bibtexurl: 'https://eduardojsborges.github.io/files/paper_icinco_2024.bib'
citation: 'L. Garrote, E. Borges, A. Mendes and U. J. Nunes (2025). "The Impact of Loss Functions and Architectures in Object Re-Identification: A Comparative Study." 24th International Conference on Robotics, Automation and Mobile Robotics (ROBOT), 2025.'
---
This paper presents a comprehensive comparative study on the impact of various loss functions and model backbone architectures for object Re-Identification (ReID) in the context of autonomous driving, using a modified version of the KITTI dataset, named KITTI-ReID. The study systematically evaluates combinations of ReID losses across multiple convolutional and transformer-based neural network backbones. Both RGB images and depth modalities (from LiDAR and monocular depth estimation) are considered, providing insights into modalityspecific ReID pipelines. The evaluation includes standard metrics like
mean Average Precision (mAP), Cumulative Matching Characteristic (CMC), and mean Inverse Negative Penalty (mINP), as well as computational efficiency (FPS). Results indicate that transformer-based architectures with large embeddings and supervised contrastive losses achieve the highest ReID accuracy, especially on RGB data, while depth-only ReID is less effective but still valuable for redundancy in tracking pipelines.
The findings provide guidance on selecting loss functions and backbones for robust object ReID in multi-object tracking systems for autonomous driving, and highlight the need for further research into effective modality fusion strategies.

![Presentation at ROBOT 2025]({{ '/images/robot_2025.png' | relative_url }})
