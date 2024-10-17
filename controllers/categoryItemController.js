import category from "../models/category.js";
import userRouter from "../routes/usersRoute.js";

export function createCategoryItems(req,res) {
   
    if (req.body.user == null) {
        res.status(403).json({
            message: "Please login to create a category item"
        });
        return;
    }
    if(req.body.user.type != "admin"){
        res.status(403).json({
            message: "Only admins can create category items"
        })
        return
    }

    const newCategoryItem = new category(req.body);
    newCategoryItem.save().then(
        (result) => {
            console.log('User:', req.user),
            console.log('Category Item Data:', req.body)
        res.json({
            message: "Category Item created successfully",
            result : result,
            

        });

    }).catch(
        (err) => {
        res.status(500).json({
            message: "Category Item creation failed",
            error : err
        });
    });
}


export function getCategoryItems(req,res){
    category.find().then(
        (list)=>{
            res.json({
                list : list
            })
        }
    )
}



//delete category

export function deleteCategoryItems(req,res){
    const user = req.body.user

    if(req.body.user == null){

        res.status(403).json({
            message : "Please login to delete a category item"
        })
        return
    }
    if(user.type != "admin"){
        res.status(403).json({
            message : "Only admins can delete category items"
        })
        return
    }
    const name = req.params.name
    category.findOneAndDelete({name : name}).then(
        ()=>{
            res.json({
                message : "Category Item deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Category Item deletion failed"  
            })
        }
    )
}

export function getCategories(req,res){

    category.find().then(
        (result)=>{
            res.json({
                Categories : result
            })
        }
    ).catch(
        (err)=>{   
            res.json({
                message : "Categories not found",
                error : err
            })
        }
    )
}


export function getCategoryByName(req,res){

    const name = req.params.name
    category.findOne({name : name}).then(
        (result)=>{
            if(result == null){
                res.json({
                    message : "Category not found"
                })
            }else{
                res.json({
                    message : "Category found",
                    result : result
                })
            }
        }
    ).catch(
        (err)=>{   
            res.json({
                message : "Category not found",
                error : err
            })
        }
    )
}


function isAdminValid(req){
    if (req.user == null) {
        return false
    }
    if (req.user.type != "admin") {
        return false
    }
    return true
}



export function updateCategory(req,res){

    if(isAdminValid(req)){
        res.json({
            message : "Only admins can update category items"
        })
        return
    }

    category.
}