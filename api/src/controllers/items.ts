import Item from "../models/item"

// Lists all items
export const listItems = async (page: number) => {
  try{
    let result = await Item.find({});
    return result;
  }catch(err){
    console.log(err);
    return [];
  }
}

// Creates an item
export const createItem = async (name:string,description:string,category:string,price: number,image:string) => {
  try{
    await Item.create({
      name,
      description,
      category,
      price,
      image
    })
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