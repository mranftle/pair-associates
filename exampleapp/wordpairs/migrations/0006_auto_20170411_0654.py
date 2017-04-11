# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordpairs', '0005_auto_20170411_0650'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userresponse',
            options={'ordering': ('created',)},
        ),
    ]
