"""
ObolosCoin (OBLS)

t1: Anna sends Bob 2 OBLS
t2: Bob sends Daniel 4.3 OBLS
t3: Mark sends Charlie 3.2 OBLS

Hash function : SHA256

B1 ("AAA",t1,t2,t3) -> 76fd89,  B2("76fd89",t4,t5,t6) -> 8923ff, B3("8923ff",t7)
B : (String:previousBlockHash, Transation[] transation_list)
ObolHash()
"""

import hashlib

class ObolosCoinBlock():
    def __init__(s, previous_block_hash,transation_list):
        s.previous_block_hash = previous_block_hash
        s.transation_list = transation_list

        s.block_data = "-".join(transation_list)+"-"+previous_block_hash
        s.block_hash = hashlib.sha256(s.block_data.encode()).hexdigest()

t1 = "Anna sends 2 NC to Mike"
t2 = "Bob sends 4.1 NC to Mike"
t3 = "Mike sends 3.2 NC to Bob"
t4 = "Daniel sends 0.3 NC to Anna"
t5 = "Mike sends 1 NC to Charlie"
t6 = "Mike sends 5.4 NC to Daniel"

initial_block = ObolosCoinBlock("Initial String", [t1,t2])

print(initial_block.block_data)
print(initial_block.block_hash)
