import json

f = open("./assets/data.txt", "r")

result= dict()

for line in f:
    components = line.split()
    name = components[0]
    comment = list()
    tags  = list()

    for word in components[1:]:
        if (word.isupper()):
            tags.append(word)
        else:
            comment.append(word)

    result[name] = dict()
    result[name]["tags"]=tags
    result[name]["description"]=" ".join(comment)

json_string = json.dumps(result)
print(json_string)
