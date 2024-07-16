from database import dbConnect
from database import membership_data
from database import carmodel_data
from database import locationData
from database import postDatas
from database import gridDatabase
from database import totalCountDatabase
from database import deleteDatabase
from database import combinedDatabase
from database import editDatabase

#PC_12 to PC_15 
# printMembership() function is declared to handle the membership query
def printMembership():
# to lock error in the console try except block is used
    try:
        # membership_query is used to get the id, and membership_type from membership table
        membership_query = ("""SELECT id, membership_type FROM CAR.membership """)
        membership = membership_data(membership_query) # to pass the membership query to the database, membership_query is passed in the membership_data
        return membership
    except ValueError as e:
        return e
        
#PC_14 to PC_15 
# car_data() function is declared to handle the carmodel query
def car_data():
# to lock error in the console try except block is used
    try:
        # membership_query is used to get the id, and membership_type from membership table
        carmodel_query = ("""SELECT id, car_type FROM CAR.carmodel """)
        carmodel = carmodel_data(carmodel_query)
        return carmodel
    except ValueError as e:
        return e

#PC_13 to PC_19 
# printlocation() function is declared to handle the location query
def printlocation():
# to lock error in the console try except block is used
    try:
# membership id is destructred
          
# membership_query is used to get the id, and location based on the membership_id
        location_query = """SELECT location_id, membership_id, location FROM CAR.location"""
        # location = locationData(location_query, (id,)) # to pass the membership query to the database, location query is passed in the location with id as the membership_id
        location = locationData(location_query)
        return location
    except ValueError as e:
        # print("Error:", e)
        return e

#PC_12 to PC_38
#postData function used to insert the data in the customer_details database
def postData(body):
# to insert the variable, the varibales are get from the body request JSON
    id = body.get('id')
    first_name = body.get('first_name')
    last_name = body.get('last_name')
    email_address = body.get('email_address')
    gender = body.get('gender')
    contact = body.get('contact')
    date_of_birth = body.get('date_of_birth')
    status = body.get('status')
    membership_id = body.get('membership_id')
    location_id = body.get('location_id')
    car_model_id = body.get('car_model_id')
    transmission_type = body.get('transmission_type')
    fuel_type = body.get('fuel_type')
    #print("-----",id)
    try:
# Initially check for condition all the variable or not empty
        if '' in [first_name, last_name, email_address, contact, date_of_birth, status, membership_id, location_id, car_model_id, transmission_type, fuel_type]:
            return "Field is empty" 
# if not in else check id equals 0 perform the insert query, else perform the update query 
        else:
            if id == "":
                post_query = """INSERT INTO CAR.customer_details(first_name, last_name, email_address, gender, contact, date_of_birth, status, membership_id, location_id, car_model_id, transmission_type, fuel_type) VALUES ( %s , %s , %s , %s , %s , %s , %s , %s , %s , %s , %s , %s )"""
                post_data = postDatas(post_query, (first_name, last_name, email_address, gender, contact, date_of_birth, status, membership_id, location_id, car_model_id, transmission_type, fuel_type))
                print("insertQuery")
            else: 
                post_query = """UPDATE CAR.customer_details 
                                SET first_name=%s, 
                                last_name=%s, 
                                email_address=%s, 
                                gender=%s, 
                                contact=%s, 
                                date_of_birth=%s, 
                                status=%s, 
                                membership_id=%s, 
                                location_id=%s, 
                                car_model_id=%s, 
                                transmission_type=%s, 
                                fuel_type=%s
                             WHERE id=%s"""
# To insert or update the data pass the query and the parameter to bind in the query in the field of %s
                post_data = postDatas(post_query, (first_name, last_name, email_address, gender, contact, date_of_birth, status, membership_id, location_id, car_model_id, transmission_type, fuel_type, id))
                print("UPDATE query")        
        return post_data
    except ValueError as e:
        return e
    
#PC_17 to PC_42
# printGrid function is used to bind the grid data which will fetches the datas from the database 
def printGrid(body):
# search, membershipId, locationId, status, column, order, loadMore are the JSON file variable which is fetched using the request body
    try:
        search = body['search']
        membershipId = body['filter']['membershipId']
        locationId = body['filter']['locationId']
        status = body['filter']['status']
        column = body['sort']['column']
        order = body['sort']['order']
        loadMore = body['loadMore']

        
        # where_condition = ""
        # if search:
        #     where_condition += f" AND (CD.first_name LIKE '%{search}%' OR CD.last_name LIKE '%{search}%')"
        
        # if membershipId is not None and locationId is not None and status is not None:
        #     if status == "Active":
        #         status_value = True
        #     else:
        #         status_value = False          
        #     where_condition += f" AND CD.membership_id = '{membershipId}' AND CD.location_id = '{locationId}' AND CD.status = {status_value}"

        # if column and order:
        #     order_condition = f" ORDER BY {column} {order}"
# The select query is to select all the columns from the customer_details table which is INNER JOINED with membership, location and carmodel, to get the membership_type, location and carmodel_type
        gridQuery = """
        SELECT CD.id,
        CD.first_name,
        CD.last_name,
        CD.email_address,
        CD.gender,
        CD.contact,
        CD.date_of_birth,
        CD.status,
        M.membership_type,
        L.location,
        CD.car_model_id,
        CM.car_type,
        CD.transmission_type,
        CD.fuel_type
        FROM CAR.customer_details AS CD
        INNER JOIN CAR.membership AS M 
        ON CD.membership_id = M.id
        INNER JOIN CAR.location AS L 
        ON CD.location_id = L.location_id
        INNER JOIN CAR.carmodel AS CM 
        ON CD.car_model_id = CM.id 
        """
# The empty list is assigned with the conditions 
        conditions = [] 
# if search is true, means if there is any value present search variable
        if search: #conditions is appended with like is used to search the first_name or last_name  within the braces the variable search is assigned with two sides of %
             # the query seems SELECT * FROM CAR.customer_details WHERE CD.first_name %search value% || CD.last_name %search value%
             conditions.append(f"(CD.first_name LIKE '%' || '{search}' || '%' OR CD.last_name LIKE '%' || '{search}' || '%')")
# if membershipId and locationId and status is not none is true, means if there is any value present search variable
        if membershipId and locationId and status is not None:
            if status == "Active":
                status_value = True
            else:
                status_value = False
            # conditions are appended with the gridQuery
            conditions.append(f"(CD.membership_id = '{membershipId}' AND CD.location_id = '{locationId}' AND CD.status = {status_value})")
# if conditions, if any condition list is having any query, the WHERE Query AND Query is joined using join function
        if conditions:
# Example SELECT * FROM customer_details WHERE CD.first_name="name" AND CD.last_name = "name"
            gridQuery += "WHERE"+"AND".join(conditions)
           # print("----------------",gridQuery)
# if column and order is not none order By firstname ASC is appended
        if column and order:
            gridQuery += f" ORDER BY {column} {order}"           
        if loadMore:
            offset = loadMore - 7 if loadMore > 7 else 0
            gridQuery += f" LIMIT 7 OFFSET {offset}"
        
      #  print("grid----->",gridQuery)
        # print("------Query executed --------")

        grid = gridDatabase(gridQuery)
       # print(grid)
        return grid
        

    except Exception as e:
        return str(e)
# totals function is used to find the totalCount of rows in the database table   
#PC_64 to PC_66
def totals():
    totalCountQuery = ("""SELECT COUNT(*) from CAR.customer_details AS totalCount""")
    total = totalCountDatabase(totalCountQuery)
    return total


def deleteData(body):
    id = body['id']
    is_active = 'false'
    print("DELETE-------------------")
   # print("---",id)
    delete_query = """UPDATE CAR.customer_details SET is_active = 'false' WHERE id = %s"""
    delete_data = deleteDatabase(delete_query,(id,))
    
    return delete_data


def editData(body):
    id = body['id']
    edit_query = """SELECT CD.id,
        CD.first_name,
        CD.last_name,
        CD.email_address,
        CD.gender,
        CD.contact,
        CD.date_of_birth,
        CD.status,
        CD.membership_id,
        M.membership_type,
        CD.location_id,
        L.location,
        CD.car_model_id,
        CM.car_type,
        CD.transmission_type,
        CD.fuel_type
        FROM CAR.customer_details AS CD
        INNER JOIN CAR.membership AS M 
        ON CD.membership_id = M.id
        INNER JOIN CAR.location AS L 
        ON CD.location_id = L.location_id
        INNER JOIN CAR.carmodel AS CM 
        ON CD.car_model_id = CM.id 
        WHERE CD.id = %s"""
    edit_data = editDatabase(edit_query,(id,))
    
    return edit_data

def combindropdown():
    membership_query = """SELECT id, membership_type FROM CAR.membership"""
    location_query = """SELECT location_id, location FROM CAR.location"""
    carmodel_query = """SELECT id, car_type FROM CAR.carmodel"""
    
    combined_query = combinedDatabase(membership_query, location_query,carmodel_query)
    
    
    return combined_query
    
    
        
  

    
    

    
    
    
    
    
    
