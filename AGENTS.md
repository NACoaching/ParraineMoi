# Instructions pour le site Codes-de-Parrainages.com (ParraineMoi)

## Gestion des codes à validité limitée (Revolut, Sumeria, etc.)
Les programmes de parrainage de certaines néobanques (Revolut, Sumeria) fonctionnent par campagnes temporaires à durée variable.

Dès que Nolwen fournit un nouveau code / lien de parrainage :
1. **Dans `src/data/referrals.json` :**
   - Mettre à jour `code` et `link`.
   - Renseigner la date de fin dans `expiresAt` (au format `YYYY-MM-DD`, ex: `"2026-12-08"`).
2. **Dans `src/data/guides.json` :**
   - Mettre à jour la date de validité dans le bandeau d'alerte en tête des guides dédiés :
     - Pour Revolut : `guide-voyage-revolut-frais-bancaires-etranger`
     - Pour Sumeria : `code-parrainage-sumeria-lydia-2026`
3. **Dans les automations Antigravity :**
   - Mettre à jour la date de déclenchement dans le sidecar correspondant (`~/.gemini/config/sidecars/rappel-expiration-revolut/sidecar.json` ou `rappel-expiration-sumeria/sidecar.json`) pour qu'un e-mail de rappel lui soit envoyé à 09h00 le jour de la nouvelle expiration.
