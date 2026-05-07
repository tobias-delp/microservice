# Service-Kommunikation in Kubernetes

```mermaid
flowchart LR
    client[Client]
    gatewaySvc[Service<br/>api-gateway:3000]
    gatewayPod[Pod<br/>api-gateway]
    orderSvc[Service<br/>order-service:3003]
    orderPod[Pod<br/>order-service]
    productSvc[Service<br/>product-service:3001]
    productPod[Pod<br/>product-service]
    inventorySvc[Service<br/>inventory-service:3002]
    inventoryPod[Pod<br/>inventory-service]

    client -->|kubectl port-forward<br/>localhost:3000| gatewaySvc
    gatewaySvc --> gatewayPod

    gatewayPod -->|GET /products| productSvc
    productSvc --> productPod

    gatewayPod -->|POST /orders| orderSvc
    orderSvc --> orderPod

    orderPod -->|GET /products/:id| productSvc
    orderPod -->|GET /inventory/:productId| inventorySvc

    inventorySvc --> inventoryPod
```

Kubernetes-Service-Namen wie `product-service` und `order-service` sind die
stabilen internen Netzwerkadressen. Die Pods koennen ersetzt werden, ohne dass
sich die URL fuer andere Services aendert.

