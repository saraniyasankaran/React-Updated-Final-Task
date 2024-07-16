# flask, request is imported from the Flask
from flask import Flask, request, jsonify #PC_1 to PC_2
# car_data, printMembership, printlocation, postData, printGrid, totals are the functions imported from the controller
from controller import car_data
from controller import printMembership
from flask_cors import CORS
from controller import printlocation
from controller import postData
from controller import printGrid
from controller import totals
from controller import deleteData
from controller import editData
from controller import combindropdown

# Instace name is created with the variable app to check for the current file
#PC_4 to PC_5
app = Flask(__name__) 
CORS(app)

#route function is created to hit the endpoint membership with the GET method to get the membership dropdown
@app.route('/membership',methods=['GET']) 
# function getMembership() was defined
def getMembership(): #PC_8 to PC_11
# In try block variable membership_data call the function printMembership()
    try:
        membership_data = printMembership()
        print(membership_data)
# membership_data is returned to the frontend
        return {
            'membership_data' : membership_data,
            'status' : 200
        }
# In except block Value Error is locked
    except ValueError as e:
         return {
            'e' : e,
            'status' : 400
        }
 
#route function is created to hit the endpoint carModels with the GET method to get the carModel dropdown 
# PC_5 to PC_12  
@app.route('/carModels',methods=['GET'])
# function getMembership() was defined
#PC_8 to PC_12
def getCarModel():

# In try block variable carmodel_data call the function car_data()
    try:
        carmodel_data = car_data()
        return {
            'carmodel_data' : carmodel_data,
            'status' : 200
        }
# carmodel_data is returned to the frontend
# In except block Value Error is locked
    except ValueError as e:
         return {
            'e' : e,
            'status' : 400
        }
        
#route function is created to hit the endpoint location with the POST method, because membership_id is passed as the body      
@app.route('/location',methods=['POST']) #PC_4 to PC_5
# function postLocation was defined 
#PC_8 to PC_12
def postLocation():
# In try block variable location_data call the function printlocation(body)
    try:
# to request the membership_id body is used to get the JSON
        body = request.get_json()
        print(body)
        location_data =  printlocation(body)
        if(location_data):
            return {
                'location_data' : location_data,
                'status' : 200
            }
# location_data is returned to the frontend
# In except block Value Error is locked
    except ValueError as e:
        return {
            'e' : e,
            'status' : 400
        }
   
   
@app.route('/combined',methods=['GET']) 
def combined():
    try:
        membership = printMembership()
        location = printlocation()
        carmodel = car_data()
        
        if(membership is not None and location is not None and carmodel is not None):
            combinedDrop = {
                'membership' : membership,
                'location' :  location,
                'carmodel' : carmodel
            }
        
        
        return combinedDrop
        
    except Exception as e:
        return e     
        

   
    
#route function is created to hit the endpoint post with the POST method, because payload is passed
@app.route('/post',methods=['POST']) 
# function postDataApi was defined
#PC_4 to PC_5
def postDataApi():
# In try block variable post_data_api call the function postData(body)
# PC_7 to PC_11
    try:
        body = request.get_json()
        print(body)
        post_data_api = postData(body)  
        
        return post_data_api
# post_data_api is returned to the frontend
# In except block Value Error is locked
    except ValueError as e:
        return {
            'e' : e,
            'status' : 400
        }

#route function is created to hit the endpoint grid with the POST method, because payload is passed
@app.route('/grid',methods=['POST']) 
# function postDataApi was defined
# PC_9 to PC_16
def getGridData():
# In try block variable post_data_api call the function postData(body)
    try:
# to request the json body is defined
        body = request.get_json()
        print(body)
        gridData = printGrid(body)
        total = totals()
# grid is returned to the frontend
        grid = {
            'gridData': gridData,
            'total': total
        }
        return grid
       # return gridData
# In except block Value Error is locked

    except ValueError as e:
        return {
            'e' : e,
            'status' : 400
        }
        
@app.route('/edit', methods=['POST'])
def editApi():
    try:
        body = request.get_json()
        edit_data_api = editData(body)
        print(edit_data_api)
      
        return edit_data_api
    except ValueError as e:
        return e
                

@app.route('/delete',methods=['POST']) 
def deleteDataApi():
    try:
        body = request.get_json()
        delete_data_api = deleteData(body)
        
        return delete_data_api
    except ValueError as e:
        return e


        


    
    
# It checks for main file app.run() execute the current file 
if __name__ == '__main__': #PC_6 to PC_7
    app.run()
    # app.run(debug=True,port=5000)
    