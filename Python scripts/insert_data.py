import csv
import os
f = open('./InsertData.sql','w+')
dirs = os.listdir('./')



with open('users.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)

    for row in csv_reader:
        s = "INSERT INTO users VALUES ("
        for i in range(len(row)):
            if not row[i].isdigit() :
                row[i] = row[i].replace(u"\u2018", "'").replace(u"\u2019", "'").replace("'","''")
                s += "'"+row[i]+"'"
            else:
                s += str(row[i])+""
            if i!= len(row)-1:
                s += ","
        s += ");\n"

        f.write(s)
        
        

with open('courses.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)

    for row in csv_reader:
        s = "INSERT INTO courses VALUES ("
        for i in range(len(row)):
            if not row[i].isdigit() :
                row[i] = row[i].replace(u"\u2018", "'").replace(u"\u2019", "'").replace("'","''")
                s += "'"+row[i]+"'"
            else:
                s += str(row[i])+""
            if i!= len(row)-1:
                s += ","
        s += ");\n"

        f.write(s)
        
        
with open('tags_courses.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)

    for row in csv_reader:
        s = "INSERT INTO tags_courses VALUES ("
        for i in range(len(row)):
            if not row[i].isdigit() :
                row[i] = row[i].replace(u"\u2018", "'").replace(u"\u2019", "'").replace("'","''")
                s += "'"+row[i]+"'"
            else:
                s += str(row[i])+""
            if i!= len(row)-1:
                s += ","
        s += ");\n"

        f.write(s)
        


with open('questions.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)

    for row in csv_reader:
        s = "INSERT INTO questions VALUES ("
        for i in range(len(row)):
            
            if not row[i].isdigit() :
                if row[i] == '':
                    s += "NULL"
                else:
                    row[i] = row[i].replace(u"\u2018", "'").replace(u"\u2019", "'").replace("'","''")
                    s += "'"+row[i]+"'"
            else:
                
                s += str(row[i])+""
            if i!= len(row)-1:
                s += ","
        s += ");\n"

        f.write(s)
        
        



with open('answers.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)

    for row in csv_reader:
        s = "INSERT INTO answers VALUES ("
        for i in range(len(row)):
            if not row[i].isdigit() :
                row[i] = row[i].replace(u"\u2018", "'").replace(u"\u2019", "'").replace("'","''")
                s += "'"+row[i]+"'"
            else:
                s += str(row[i])+""
            if i!= len(row)-1:
                s += ","
        s += ");\n"

        f.write(s)
        
        


with open('question_comments.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)

    for row in csv_reader:
        s = "INSERT INTO question_comments VALUES ("
        for i in range(len(row)):
            if not row[i].isdigit() :
                row[i] = row[i].replace(u"\u2018", "'").replace(u"\u2019", "'").replace("'","''")
                s += "'"+row[i]+"'"
            else:
                s += str(row[i])+""
            if i!= len(row)-1:
                s += ","
        s += ");\n"

        f.write(s)
        



with open('question_likes.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)

    for row in csv_reader:
        s = "INSERT INTO question_likes VALUES ("
        for i in range(len(row)):
            s += row[i]
            if i!= len(row)-1:
                s += ","
        s += ");\n"

        f.write(s)

with open('answer_likes.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)

    for row in csv_reader:
        s = "INSERT INTO answer_likes VALUES ("
        for i in range(len(row)):
            s += row[i]
            if i!= len(row)-1:
                s += ","
        s += ");\n"

        f.write(s)


with open('answer_comments.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)

    for row in csv_reader:
        s = "INSERT INTO answer_comments VALUES ("
        for i in range(len(row)):
            if not row[i].isdigit() :
                row[i] = row[i].replace(u"\u2018", "'").replace(u"\u2019", "'").replace("'","''")
                s += "'"+row[i]+"'"
            else:
                s += str(row[i])+""
            if i!= len(row)-1:
                s += ","
        s += ");\n"

        f.write(s)
        
        

f.close()
