# Modèle 3D du robot

Dépose ici ton modèle du robot au format **glTF binaire** :

```
public/models/robot.glb
```

Dès que le fichier est présent, il s'affiche automatiquement dans le hero
(rotation auto + rotation à la souris). Tant qu'il est absent, un robot
stylisé généré en 3D est affiché à la place (aucune erreur).

Conseils :
- Format `.glb` (glTF binaire) de préférence, compressé (Draco) si lourd.
- Modèle centré sur l'origine, échelle en mètres.
- Si l'échelle/position ne tombe pas juste, ajuster `scale`/`position`
  dans `src/components/robot-3d.tsx` (composant `GLBRobot`).
