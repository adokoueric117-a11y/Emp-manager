from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=200)
    Email = models.EmailField(max_length=200, unique=True)
    departement = models.CharField(max_length=200)
    poste = models.CharField(max_length=200)
    salaire = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return  str(self.name)
    
    objects = models.Manager()