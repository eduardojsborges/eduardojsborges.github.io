---
title: "Attention-Based Multimodal Fusion for Robust 6D Pose Estimation in Cluttered Industrial Environments"
authors: ["M. Abreu","E. Borges","J. Perdiz","L. Garrote","A. Mendes","U. J. Nunes"]
date: "2026-04-22"
venue: "2026 IEEE International Conference on Autonomous Robot Systems and Competitions (ICARSC)"
venueShort: "ICARSC"
summary: "This paper presents a multimodal architecture for 6D pose estimation that combines RGB, depth maps, and 3D point clouds to improve robustness in such conditions."
featured: true
citation: "@INPROCEEDINGS{abreu2026attention,
  author={Abreu, Manuel and Borges, Eduardo and Perdiz, João and Garrote, Luís and Mendes, Abel and Nunes, Urbano J.},
  booktitle={2026 IEEE International Conference on Autonomous Robot Systems and Competitions (ICARSC)}, 
  title={Attention-Based Multimodal Fusion for Robust 6D Pose Estimation in Cluttered Industrial Environments}, 
  year={2026},
  volume={},
  number={},
  pages={124-131},
  keywords={Modeling;Clouds;Pose estimation;Distance measurement;Cameras;Laser radar;Printing;Measurement;Conferences;Annotations;6D Pose Estimation;Object Detection;Deep Learning;Autonomous Mobile Robots (AMRs)},
  doi={10.1109/ICARSC70216.2026.11523333}}
"
paperUrl: "https://doi.org/10.1109/ICARSC70216.2026.11523333"
---

Reliable 6D pose estimation in industrial environments remains challenging due to clutter, occlusions, variable illumination, and limited texture, as well as noisy or incomplete depth measurements. This paper presents a multimodal architecture for 6D pose estimation that combines RGB, depth maps, and 3D point clouds to improve robustness in such conditions. The proposed network extracts image features with lightweight CNN backbones, refining and fusing modalities through multi-head attention, and encodes point cloud geometry with a ResNet1D-like stream. Global dependencies are captured by ViT-like transformer blocks before translation and quaternion orientation are regressed. This work also presents an industrial dataset and annotation pipeline, including an in-house tool for manual 6D pose labeling, comprising 338 frames with 6180 annotated instances across seven object classes within 0–20 m.To study the impact of complementary depth sources, we evaluate two input configurations: camera-native depth combined with (i) a learned depth-estimation model and (ii) projected LiDAR depth. Using an ADD-based training objective, the best configuration (camera-native depth and LiDAR) achieves an average error of approximately 0.27 m. Camera-native depth combined with learned depth yields comparable performance, demonstrating the potential of multimodal fusion for scalable industrial 6D pose estimation. Code will be made available at: https://github.com/Manuel27Abreu/Multi6DPoseICARSC26