# Manuelle Docker-Kommandos

```bash
docker network create shop-network

docker build -t product-service:latest services/product-service
docker build -t inventory-service:latest services/inventory-service
docker build -t order-service:latest services/order-service
docker build -t api-gateway:latest services/api-gateway

docker run -d --name product-service --network shop-network -p 3001:3001 product-service:latest
docker run -d --name inventory-service --network shop-network -p 3002:3002 inventory-service:latest

docker run -d --name order-service --network shop-network -p 3003:3003 \
  -e PRODUCT_SERVICE_URL=http://product-service:3001 \
  -e INVENTORY_SERVICE_URL=http://inventory-service:3002 \
  order-service:latest

docker run -d --name api-gateway --network shop-network -p 3000:3000 \
  -e PRODUCT_SERVICE_URL=http://product-service:3001 \
  -e ORDER_SERVICE_URL=http://order-service:3003 \
  api-gateway:latest
```

