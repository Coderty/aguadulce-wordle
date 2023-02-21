# Generación y publicación de imagen con la ultima versión:
docker build --platform=linux/amd64 -t wordle-coderty-app .
docker tag wordle-coderty-app:latest 582795604416.dkr.ecr.eu-west-3.amazonaws.com/wordle-coderty-app:latest
aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 582795604416.dkr.ecr.eu-west-3.amazonaws.com
docker push 582795604416.dkr.ecr.eu-west-3.amazonaws.com/wordle-coderty-app:latest

# Actualización del servicio para que despliegue la ultima versión:
aws ecs update-service --cluster wordle-coderty-app --service wordle-coderty-service --force-new-deployment