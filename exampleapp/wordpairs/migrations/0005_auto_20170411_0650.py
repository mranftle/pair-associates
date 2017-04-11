# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordpairs', '0004_auto_20170411_0648'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userresponse',
            name='id',
            field=models.IntegerField(serialize=False, auto_created=True, primary_key=True),
        ),
    ]
