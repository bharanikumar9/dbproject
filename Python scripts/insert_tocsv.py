import csv
import random
import string

with open("./users.csv") as file:
    csvreader = csv.reader(file)
    next(csvreader)
    newh = ["user_id","display_name","password","age","location","about","creation_date","is_instructor","reputation","upvotes","downvotes","views"]
    new = []
    new.append(newh)
    for row in csvreader:
        characters = string.ascii_letters + string.digits
        random_pswd = ''.join(random.choice(characters) for i in range(random.choice(range(8, 15))))
        age = random.choice(range(18, 60))
        Is_instructor = 0
        if age >= 55:
            Is_instructor = 1 
        r = [row[0],row[1],random_pswd,age,row[6],row[2],row[4],Is_instructor,row[7],row[8],row[9],row[10]]
        new.append(r)

with open("../modified_csv_files/users.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(new)




with open("./questions.csv") as file:
    csvreader = csv.reader(file)
    next(csvreader)
    new2 = []
    newh2 = ["like_type","question_id","user_id"]
    new2.append(newh2)
    for row in csvreader:
        likedby = random.choice(range(0,115))
        for i in range(5):
            newr2 = [random.choice(range(0,2)),row[0],likedby+i]
        new2.append(newr2)

            

with open("../modified_csv_files/question_likes.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(new2)



with open("./answers.csv") as file:
    csvreader = csv.reader(file)
    next(csvreader)

    new2 = []
    newh2 = ["like_type","answer_id","user_id"]
    new2.append(newh2)
    


    for row in csvreader:
        likedby = random.choice(range(0,115))
        for i in range(5):
            newr2 = [random.choice(range(0,2)),row[0],likedby+i]
        new2.append(newr2)


with open("../modified_csv_files/answer_likes.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(new2)



# create table if not exists answer_likes(

#     like_type int,
#     answer_id int,
#     user_id int,

#     foreign key (answer_id) references answers (answer_id),
#     foreign key (user_id) references users (user_id)
# );