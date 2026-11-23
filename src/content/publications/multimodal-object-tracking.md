---
title: "A Modular Multimodal Multi-Object Tracking-by-Detection Approach, with Applications in Outdoor and Indoor Environments"
authors: ["Eduardo Borges","Luís Garrote","Urbano J. Nunes"]
date: "2024-11-01"
venue: "21st International Conference on Informatics in Control, Automation and Robotics (ICINCO)"
venueShort: "ICINCO"
summary: "A modular multimodal tracking-by-detection system for autonomous mobile robots that fuses 3D point-cloud (PointPillars + AB3DMOT) and 2D (YOLOv8) detectors to improve multi-object detection and tracking robustness — validated on KITTI."
featured: true
# flagship: true
# thumbnail: "/images/multimodal-detection.webp"
# thumbnailAlt: "RGB images pass through YOLOv8 and LiDAR point clouds through PointPillars; their 2D and 3D detections are projected onto the same street scene."
# thumbnailCaption: "Camera and LiDAR detection pipeline from the ICINCO 2024 paper (Figure 2a)."
citation: >-
    Borges, E., Garrote, L., Nunes, U. J. (2024). "A Modular Multimodal Multi-Object Tracking-by-Detection Approach, with Applications in Outdoor and Indoor Environments." In Proceedings of the 21st International Conference on Informatics in Control, Automation and Robotics (ICINCO 2024) - Volume 2
bibtex: |
    @conference{icinco24,
    author={Eduardo Borges and Luís Garrote and Urbano Nunes},
    title={A Modular Multimodal Multi-Object Tracking-by-Detection Approach, with Applications in Outdoor and Indoor Environments},
    booktitle={Proceedings of the 21st International Conference on Informatics in Control, Automation and Robotics - Volume 2: ICINCO},
    year={2024},
    pages={336-344},
    publisher={SciTePress},
    organization={INSTICC},
    doi={10.5220/0013073200003822},
    isbn={978-989-758-717-7},
    issn={2184-2809},
    }

paperUrl: "https://doi.org/10.5220/0013073200003822"
---

Object detection and tracking are integral components of numerous modern robotics systems, playing an essential role in applications like autonomous driving and industrial Autonomous Mobile Robots (AMRs). In this paper, we propose a modular multimodal multi-object detection and tracking system tailored for AMRs in complex industrial environments. The proposed system employs a tracking-by-detection approach, utilizing both 3D point cloud and RGB data to detect and track multiple objects simultaneously. To develop it, a baseline unimodal framework was created using a PointPillars detector and the AB3DMOT tracker, operating exclusively on point cloud data. To enhance detection and tracking accuracy, a 2D object detector (YOLOv8) was integrated, enabling multimodal detection. The system’s performance was evaluated on the KITTI dataset, demonstrating notable improvements in detection accuracy and tracking consistency. This enhancement strengthens the system’s robustness and reliability, which are critical factors for real-time perception in AMRs.

![Poster Presentation at ICINCO 2024](/images/icinco_2024.webp)
