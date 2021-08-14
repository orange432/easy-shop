import Item from "../models/item"

// Lists paginated list of items
export const listItems = async (page: number, itemsPerPage: number = 30) => {
  try{
    let result = await Item.find({});
    return result;
  }catch(err){
    console.log(err);
    return [];
  }
}

// Lists every item
export const listAllItems = async () => {
  try{
    let result = await Item.find({});
    return result;
  }catch(err){
    console.log(err);
    return [];
  }
}

// Creates an item
export const createItem = async (_id: string='',name:string,description:string,category:string,price: number,image:string) => {
  try{
    if(!_id){
    await Item.create({
      name,
      description,
      category,
      price,
      image
    })
    }
    else{
      await Item.findByIdAndUpdate(_id,{
        name,
        description,
        category,
        price,
        image
      })
    }
    return {success: true}
  }catch(err){
    console.log(err);
    return {success: false, error: "Database error.  Please try again.", code: "DATABASE_ERROR"}
  }
  
}

// Gets an item from the id
export const getItem = async (id: string) => {
  try{
    let result = await Item.findOne({_id: id});
    return result;
  }catch(err){
    console.log(err);
    return false;
  }
}