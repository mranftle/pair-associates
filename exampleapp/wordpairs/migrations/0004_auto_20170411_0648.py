# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('wordpairs', '0003_userresponse_response_number'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userresponse',
            options={},
        ),
        migrations.AddField(
            model_name='userresponse',
            name='user_name',
            field=models.TextField(default=datetime.datetime(2017, 4, 11, 6, 48, 0, 630797, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='userresponse',
            name='id',
            field=models.IntegerField(serialize=False, primary_key=True),
        ),
    ]
