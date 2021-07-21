import http from "./http"



// post like functions

export const likePost=async(username,postId,likeObj)=>{

    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=likePost`,
        {username,postId,likeObj})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}

export const removelikeFromPost=async(likedByUsername,username,postId)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=removeLikeFromPost`,
        {username,likedByUsername,postId})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}


export const updateLikeTypeOnPost=async(likedByUsername,username,postId,typeOfLike)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=updateLikeTypeOnPost`,
        {username,likedByUsername,postId,typeOfLike})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}




// add comment functions


export const addComment=async(username,postId,commentObj)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=addComment`,
        {username,postId,commentObj})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}


// comment like functions

export const likeComment=async(username,postId,commentId,commentObj)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=likeComment`,
        {username,postId,commentId,commentObj})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}



export const updateLikeOnComment=async(username,likedByUsername,postId,commentId,typeOfLike)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=updateLikeOnComment`,
        {username,likedByUsername,postId,commentId,typeOfLike})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}



export const removeLikeFromComment=async(username,likedByUsername,postId,commentId)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=removeLikeFromComment`,
        {username,likedByUsername,postId,commentId})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}



// replies on comment Functions



export const addCommentReply=async(username,postId,commentId,commentObj)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=addCommentReply`,
        {username,postId,commentId,commentObj})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}



export const likeCommentReply=async(username,postId,commentId,replyId,commentObj)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=likeCommentReply`,
        {username,postId,commentId,replyId,commentObj})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}



export const updateLikeOnCommentReply=async(username,likedByUsername,postId,commentId,replyId,typeOfLike)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=updateLikeOnCommentReply`,
        {username,likedByUsername,postId,commentId,replyId,typeOfLike})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}



export const removeLikeFromCommentReply=async(username,likedByUsername,postId,commentId,replyId)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=removeLikeFromCommentReply`,
        {username,likedByUsername,postId,commentId,replyId})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}


// deleting post comment and reply functions


export const deletePostFromDb=async(username,postId)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=deletePostFromDb`,
        {username,postId})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}

export const deleteCommentFromDb=async(username,postId,commentId)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=deleteCommentFromDb`,
        {username,postId,commentId})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}

export const deleteCommentReplyFromDb=async(username,postId,commentId,replyId)=>{
    try {
        const result  = await http.post(`${process.env.NEXT_PUBLIC_API}/postApi/updatePost?action=deleteCommentReplyFromDb`,
        {username,postId,commentId,replyId})
    console.log(result.data);
    } catch (error) {
        console.log(error.message); 
    }
}
