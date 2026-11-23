---
title: "Does Appearance Help? A Systematic Study of Image-Based Re-Identification in Online 3D Multi-Pedestrian Tracking"
authors: ["E. Borges","L. Garrote","U. J. Nunes"]
date: "2026-08-24"
venue: "2026 IEEE 35th International Conference on Robot and Human Interactive Communication (RO-MAN)"
venueShort: "RO-MAN"
summary: "This work presents a systematic study of image-based ReID in online 3D MOT, utilizing a lightweight projection-based framework to decouple geometric and appearance modeling for mobile robots."
featured: true
citation: "@INPROCEEDINGS{borges2026does,
  author={Borges, Eduardo and Garrote, Luís and Nunes, Urbano J.},
  booktitle={2026 IEEE 35th International Conference on Robot and Human Interactive Communication (RO-MAN)}, 
  title={Does Appearance Help? A Systematic Study of Image-Based Re-Identification in Online 3D Multi-Pedestrian Tracking}, 
  year={2026},
  volume={},
  number={},
  pages={1426-1433},
  keywords={Modeling;Tracking;Printing;Signal detection;Architecture;Computer architecture;Conferences;Object tracking;Pedestrians;Costing;Multi-Pedestrian Tracking;Multi-Object Tracking;Object Re-Identification;Tracking-by-Detection},
  doi={10.1109/RO-MAN72286.2026.11714712}}
"
paperUrl: "https://doi.org/10.1109/RO-MAN72286.2026.11714712"
---

LiDAR-based 3D Multi-Object Tracking (MOT) typically relies on geometric information, which is often insufficient to distinguish between targets during prolonged occlusions or in crowded human-populated environments. While integrating RGB-based Re-Identification (ReID) offers a theoretical solution for preserving identities, existing approaches often rely on complex parallel detectors that hinder realtime robot responsiveness. This work presents a systematic study of image-based ReID in online 3D MOT, utilizing a lightweight projection-based framework to decouple geometric and appearance modeling for mobile robots. A comprehensive analysis of feature extraction architectures is conducted, employing lightweight CNNs and Vision Transformers (ViTs), alongside an evaluation of multiple multimodal data association strategies aimed at balancing computational latency and tracking robustness. Experimental results on the KITTI-ReID dataset indicate that naive linear fusion of appearance and motion costs can degrade tracking performance, likely due to the influence of noisy visual features, underscoring the need for adaptive multimodal fusion strategies. Conversely, a cascaded matching strategy provides modest but consistent improvements in identity-aware metrics by using appearance primarily as a secondary recovery cue. Overall, the results suggest that lightweight architectures can achieve a favorable balance between latency and discriminative power, although the added ReID branch introduces a non-negligible computational cost. The KITTI-ReID dataset and code are available at https://github.com/eduardojsborges/KITTI-ReID.