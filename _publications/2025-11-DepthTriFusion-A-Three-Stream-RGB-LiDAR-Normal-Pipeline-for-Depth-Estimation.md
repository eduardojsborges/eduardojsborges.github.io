---
title: "DepthTriFusion: A Three-Stream RGB-LiDAR-Normal Pipeline for Depth Estimation"
collection: publications
category: conferences
permalink: /publication/2025-11-DepthTriFusion-A-Three-Stream-RGB-LiDAR-Normal-Pipeline-for-Depth-Estimation
excerpt: '📝 A three-stream multimodal depth estimation architecture that fuses RGB, LiDAR and surface normals to deliver more accurate and structurally consistent depth maps for autonomous mobile robots.'
date: 2025-11-11
venue: '24th International Conference on Robotics, Automation and Mobile Robotics (ROBOT)'
# slidesurl: 'https://academicpages.github.io/files/slides1.pdf'
# paperurl: 'https://ieeexplore.ieee.org/abstract/document/11181605'
# bibtexurl: 'https://eduardojsborges.github.io/files/paper_icinco_2024.bib'
citation: 'M. Abreu, E. Borges, L. Garrote, A. Mendes and U. J. Nunes (2025). &quot;DepthTriFusion: A Three-Stream RGB–LiDAR–Normal Pipeline for Depth Estimation.&quot; <i>24th International Conference on Robotics, Automation and Mobile Robotics (ROBOT), 2025.</i>'
---
This work presents DepthTriFusion, a three-stream autoencoder architecture designed to improve depth estimation for Autonomous
Mobile Robot (AMR) applications. The network fuses complementary cues from RGB images, sparse LiDAR measurements, and surface normals to improve depth accuracy and structural consistency. DepthTriFusion addresses critical limitations in existing technologies, where accurate depth estimation is essential for perception tasks in critical environments. The three-stream autoencoder combines the strengths of RGB images, sparse LiDAR measurements, and surface normals’ structural integrity. Features from each input are captured independently and fused in a shared latent space. A generic decoder is used for depth estimation, taking into account the LiDAR measurements and the scene’s structure. Surface normals are derived using three modalities: Apple’s
DepthPro, upsampled LiDAR projections, and RGB-D camera depth. Evaluation was carried out with real-world RGB and LiDAR measurements collected in a warehouse environment. Five different backbones are evaluated, namely, ResNet18, ResNet50, MobileNetV2, Swin-T, and MobileNetV3-S. The reported results demonstrate how different levels of surface normal quality influence accuracy and structural integrity, as well as the suitability of DepthTriFusion as a depth estimation pipeline.