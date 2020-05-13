import json


def parse_data_file(file_name: str) -> dict:
    f = open(file_name, "r")

    result = dict()
    for line in f:
        components = line.split()
        name = components[0]
        comment = list()
        tags = list()
        for word in components[1:]:
            if (word.isupper()):
                tags.append(word)
            else:
                comment.append(word)

        result[name] = dict()
        result[name]["tags"] = tags
        result[name]["description"] = " ".join(comment)

    return result


def spew_dict_as_ts(data_dict: dict) -> str:
    json_string = json.dumps(data_dict)
    return 'let data ={}\n\nexport {}'.format(json_string, "{ data }")


if __name__ == "__main__":
    print(spew_dict_as_ts(parse_data_file("./assets/data.txt")))
