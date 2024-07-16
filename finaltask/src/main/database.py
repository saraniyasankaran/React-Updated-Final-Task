import psycopg2

# dbConnect holds the credentials for the database
# PC_17 to PC_20
def dbConnect():
    return psycopg2.connect(
    host = "localhost",
    database = "backend",
    user = "postgres",
    password = "admin123" ,
    port = 5432 
)

# def dbConnect():
#     return psycopg2.connect(
#         host=host,
#         database=database,
#         user=username,
#         password=password,
#         port=port
#     )
    
# The membership_data function is used to make a connection with the database postgres   
# PC_21 to PC_31  
def membership_data(query):
    try:
# to Get the credentials dbConnect() fuction is assigned with pgConnection
        pgConnection = dbConnect() 
# to do any manipulations or to handle the query cursor function is defined
        cursor = pgConnection.cursor()
# to execute the query execute function was used
        cursor.execute(query)
# to fetchall the datas from database fetchall function was used
        records = cursor.fetchall()
# to store the fetched data empty list is declared 
        data = []
# Using for loop iterate the datas
        for record in records:
            id, membership_type = record
            data.append({'id': id, 'membership_type': membership_type})  
        return data
    except ValueError as e: #PC_36
        return e
 #PC_39 to PC_41   
 # In finally it should be default to close the cursor pgConnection 
    finally:
        cursor.close()
        pgConnection.commit()
        pgConnection.close()
#PC_23 to PC_34   
# The membership_data function is used to make a connection with the database postgres   

def carmodel_data(carmodel_query):
    try:
# to Get the credentials dbConnect() fuction is assigned with pgConnection
        pgConnection = dbConnect()
# to do any manipulations or to handle the query cursor function is defined
        cursor = pgConnection.cursor()
# to execute the query execute function was used
        cursor.execute(carmodel_query)
# to fetchall the datas from database fetchall function was used
        records = cursor.fetchall()
        data = []
# to iterate and to store the fetched datas for loop is used
        for record in records:
            id, car_type = record
            data.append({'id': id, 'car_type': car_type})  
        return data
    except ValueError as e:
        return e
 # In finally it should be default to close the cursor pgConnection 
 # PC_41 to PC_43   
    finally:
        cursor.close()
        pgConnection.commit()
        pgConnection.close()

# The locationData function is used to make a connection with the database postgres with the params as membership_id
#PC_26 to PC_35
def locationData(query):
    try:
# to Get the credentials dbConnect() fuction is assigned with pgConnection
        pgConnection = dbConnect()
# to do any manipulations or to handle the query cursor function is defined
        cursor = pgConnection.cursor()
# to execute the query execute function was used
        cursor.execute(query)
# to fetchall the datas from database fetchall function was used
        records = cursor.fetchall()
        data = []
# Using for loop iterate the datas
        for record in records:
            location_id, membership_id, location = record
            data.append({'location_id': location_id, 'membership_id' : membership_id, 'location': location})  
        return data
    except ValueError as e:
        return e
#PC_45 to PC_47    
    finally:
        cursor.close()
        pgConnection.commit()
        pgConnection.close()

# PC_38 to PC_48
# The postDatas function is used to make a connection with the database postgres with the params all the columns to insert
def postDatas(query, params=None):
    try:
# to Get the credentials dbConnect() fuction is assigned with pgConnection
        pgConnection = dbConnect()
# to do any manipulations or to handle the query cursor function is defined
        cursor = pgConnection.cursor()
        cursor.execute(query, params)
# return that the data is inserted successfully, the user will know
        print("Data Inserted Successfully")
        return "Data Inserted Successfully!!!"
    except ValueError as e:
        return e
#PC_56 to PC_58
    finally:
        cursor.close()
        pgConnection.commit()
        pgConnection.close()
 
#PC_48 to PC_60        
def gridDatabase(gridQuery):
    try:
        pgConnection = dbConnect()
        cursor = pgConnection.cursor()
        cursor.execute(gridQuery)
        records = cursor.fetchall()
        print(records)
        print("Data retrieved")
        data = []
# Not easy to get particular column name with a for loop, because all the column should have to declared. So using encumerate dynamically the datas are fectched from the database
        for record in records:
            row = {}
            for i, column in enumerate(cursor.description):
                row[column.name] = record[i]
            data.append(row)
           
        # print(data)
        pgConnection.commit()
        return data
                
            
        # for record in records:
        #    dictionary_data = {
               
        #         "first_name": record[0],
        #         "last_name": record[1],
        #         "email_address": record[2],
        #         "gender": record[3],
        #         "contact": record[4],
        #         "date_of_birth": record[5],
        #         "status": record[6],
        #         "membership_type": record[7],
        #         "location": record[8],
        #         "car_type": record[9],
        #         "transmission_type": record[10],
        #         "fuel_type": record[11]
        #     }
    except ValueError as e:
        return e
    finally:
        cursor.close()
        pgConnection.close()
        
# to find totalCOunt of rows in the database totalCountDatabase function is declared   
#PC_67 to PC_76     
def totalCountDatabase(query):
    try:
        pgConnection = dbConnect()
        cursor = pgConnection.cursor()
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)        
        return records
    except ValueError as e:
        return e 
    finally:
        cursor.close()
        pgConnection.close()
        
def deleteDatabase(delete_query, params):
    try:
        pgConnection = dbConnect()
        cursor = pgConnection.cursor()
        cursor.execute(delete_query, params)
        pgConnection.commit()
       # print(records)        
        return "DELETED successfully!!!"
    except ValueError as e:
        return e 
    finally:
        cursor.close()
        pgConnection.close()


def editDatabase(edit_query, params):
    try:
        pgConnection = dbConnect()
        cursor = pgConnection.cursor()
        cursor.execute(edit_query, params)
        records = cursor.fetchall()
        data = []
        for record in records:
            row = {}
            for i, column in enumerate(cursor.description):
                row[column.name] = record[i]
            data.append(row)
        return data
        pgConnection.commit()
        
    except ValueError as e:
        return e
        
    finally:
        cursor.close()
        pgConnection.close()



# database.py
# database.py
def combinedDatabase(membership_query, location_query, carmodel_query):
    try:
        pgConnection = dbConnect()
        cursor = pgConnection.cursor()
        
        combined_data = {
            "membership": [],
            "location": [],
            "carmodel": []
        }

        # Execute individual queries
        for idx, query in enumerate([membership_query, location_query, carmodel_query]):
            cursor.execute(query)
            data = cursor.fetchall()
            combined_data[list(combined_data.keys())[idx]] = data

        pgConnection.commit()
        
        return combined_data
    except Exception as e:
        # Log the error or handle it appropriately
        return None
    finally:
        cursor.close()
        pgConnection.close()

        


        
    
        
    
        
    
    
        
    



