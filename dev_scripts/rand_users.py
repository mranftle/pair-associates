import string
import random
from wordpairs.models import User
from __future__ import print_function
users = []
for i in range(0,2):
    x = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
    y = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
    users.append[(x,y)]
    u = User.objects.create_user(username=x, password=y, test_phase=1)
    u.save()
print(users, file="created_users.txt")


# ['UKCQ58DR8Y', 'BUVR28ZEPU', '0HN30IZNME', 'FZXNOSOE75', '2ZVOASKFJT', 'BFS341OOFI', 'ZCYC83VPDG', '4TSUFOFFZW', 'NFGTQE7XDF', 'X7PSGJE21N']
# ['TFDVSL8U17', '456L7DRDFD', '0AKSIKCCLO', '7LAT6L78M2', 'KTZQPXVXUD', '7LYC0BDEL0', 'T8KGW8FVXK', 'AZOW0XASF8', '3WPKETLGLR', 'PWLKYND6XJ']
