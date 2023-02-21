### Generar todo el stack:
```
aws cloudformation create-stack --stack-name wordle-coderty-app --template-body file://./ecs.yml --capabilities CAPABILITY_NAMED_IAM
```

### Generar ECR (si no existe):
```
aws cloudformation create-stack --stack-name wordle-coderty-ecr --template-body file://./ecr.yml --capabilities CAPABILITY_NAMED_IAM
```

### Despliegue, generar nueva imagen, publicarla y forzar despliegue en el servicio:
```
deploy.sh
```

### Para replicar esta infraestructura en otro AWS Account:

- Reemplace el ID de la cuenta demo (582795604416) de AWS por el de su cuenta.
- Reemplace el nombre de la región demo (us-east-1) por el de su región.
- Reemplace el ID de la VPC demo (vpc-0b9a5c6f) por el de su VPC.
- Reemplace el ID de la subred demo (subnet-0e029b3c7a62790a5 y subnet-05c9e20434459ba1d) por el de su subred.
- Reemplace el id del Hosted Zone demo (Z07941282UMOXNYOOLN8Y) por el de su Hosted Zone.
- Reemplace el nombre del dominio demo (coderty.ninja) por el de su dominio.
