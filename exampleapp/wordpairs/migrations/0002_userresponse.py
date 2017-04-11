# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordpairs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserResponse',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('word1', models.TextField()),
                ('word2', models.TextField()),
                ('response', models.TextField()),
                ('response_time', models.IntegerField()),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
