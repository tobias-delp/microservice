# Iteration 05: Kubernetes

Ziel: Deployments, Services, Namespace und Probes verstehen.

```bash
kubectl apply -f k8s/
kubectl get pods -n mini-shop
kubectl port-forward svc/api-gateway 3000:3000 -n mini-shop
```

Ein Schaubild der Kommunikation steht in `docs/service-communication.md`.
