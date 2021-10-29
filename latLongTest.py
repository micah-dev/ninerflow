import re
for _ in range(int(input())):
    string = re.search('(.*)',input()).group()
    if string:
        string = re.sub('[(|)|+|-]','',string)
        string = re.sub(' ','',string)
        index = string.index(',')
        n1 = string[:index]
        n2 = string[index+1:]
        
        if n1[0]=='0' or n2[0]=='0' or n1[-1]=='.' or n2[-1]=='.':
            print("Invalid")
        else:
            n1 = float(string[:index])
            n2 = float(string[index+1:])
        
            if n1>=-90 and n1<=90 and n2 >= -180 and n2<=180:
                print("Valid")
            else:
                print("Invalid")
    else:
        print("Invalid")
