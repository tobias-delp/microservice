# Kubernetes

Die Manifeste sind fuer lokale Kubernetes-Umgebungen wie Docker Desktop gedacht.
Darum verwenden sie `imagePullPolicy: Never` und lokale Image-Namen.

## Start

```bash
kubectl apply -f k8s/
kubectl get pods -n mini-shop
kubectl port-forward svc/api-gateway 3000:3000 -n mini-shop
```

## Begriffe

- `Namespace`: logische Trennung der Ressourcen.
- `Deployment`: beschreibt gewuenschte Pods und Replica-Anzahl.
- `Pod`: kleinste ausfuehrbare Einheit.
- `Service`: stabile Netzwerkadresse fuer Pods.
- `readinessProbe`: entscheidet, ob ein Pod Traffic bekommen soll.
- `livenessProbe`: entscheidet, ob ein Pod neu gestartet werden soll.

