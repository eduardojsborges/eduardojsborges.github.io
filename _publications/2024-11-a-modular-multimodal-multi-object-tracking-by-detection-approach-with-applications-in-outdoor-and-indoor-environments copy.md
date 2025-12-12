---
title: "A Modular Multimodal Multi-Object Tracking-by-Detection Approach, with Applications in Outdoor and Indoor Environments"
collection: publications
category: conferences
permalink: /publication/2024-11-a-modular-multimodal-multi-object-tracking-by-detection-approach-with-applications-in-outdoor-and-indoor-environments
excerpt: 'A modular multimodal tracking-by-detection system for autonomous mobile robots that fuses 3D point-cloud (PointPillars + AB3DMOT) and 2D (YOLOv8) detectors to improve multi-object detection and tracking robustness — validated on KITTI.'
date: 2024-11-01
venue: '21st International Conference on Informatics in Control, Automation and Robotics (ICINCO)'
# slidesurl: 'https://academicpages.github.io/files/slides1.pdf'
paperurl: 'https://www.scitepress.org/Papers/2024/130732/130732.pdf'
bibtexurl: 'https://eduardojsborges.github.io/files/paper_icinco_2024.bib'
citation: 'Borges, E., Garrote, L., Nunes, U. J. (2024). &quot;A Modular Multimodal Multi-Object Tracking-by-Detection Approach, with Applications in Outdoor and Indoor Environments.&quot; <i>In Proceedings of the 21st International Conference on Informatics in Control, Automation and Robotics (ICINCO 2024) - Volume 2</i>'
---
Object detection and tracking are integral components of numerous modern robotics systems, playing an essential role in applications like autonomous driving and industrial Autonomous Mobile Robots (AMRs). In
this paper, we propose a modular multimodal multi-object detection and tracking system tailored for AMRs
in complex industrial environments. The proposed system employs a tracking-by-detection approach, utilizing both 3D point cloud and RGB data to detect and track multiple objects simultaneously. To develop it,
a baseline unimodal framework was created using a PointPillars detector and the AB3DMOT tracker, operating exclusively on point cloud data. To enhance detection and tracking accuracy, a 2D object detector
(YOLOv8) was integrated, enabling multimodal detection. The system’s performance was evaluated on the
KITTI dataset, demonstrating notable improvements in detection accuracy and tracking consistency. This
enhancement strengthens the system’s robustness and reliability, which are critical factors for real-time perception in AMRs.

![Poster Presentation at ICINCO 2024]({{ '/images/icinco_2024.png' | relative_url }})

