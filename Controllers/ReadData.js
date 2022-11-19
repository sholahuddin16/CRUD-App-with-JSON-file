import fs from "fs";

const dataPathSample = './Details/sample.json';
const dataPathAccount = './Details/useraccount.json';

/* util functions */
//read the account data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPathAccount, stringifyData)
}
//get the account data from json file
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPathAccount)
    return JSON.parse(jsonData)
}

// reading all data sample 
export const getDataSample = (req, res) => {
    fs.readFile(dataPathSample, 'utf-8', (err, data) => {
        try {
            const dataSample = JSON.parse(data);
            console.log(dataSample);
            res.send(dataSample);
        } catch (error) {
            res.send({ message: error.message })
        }
    })
}

// reading the data array insede object with database sample 
export const filterDataSample = (req, res) => {
    fs.readFile(dataPathSample, 'utf-8', (err, data) => {
        try {
            const dataSample = JSON.parse(data);

            const sample = dataSample.filter(e => e.details[0].balance <= 10000) // Show data belance under 10000 with filter
            console.log(sample);
            res.send(sample);
        } catch (error) {
            res.send({ message: error.message })
        }
    })
}

// reading all data account
export const getDataAccount = (req, res) => {
    try {
        const account = getAccountData();

        console.log(account);
        res.send(account);
    } catch (error) {
        console.log(error);
        res.send({ message: error.message });
    }
}

// reading the data array insede object with database account
export const filterDataAccount = (req, res) => {
    fs.readFile(dataPathAccount, 'utf-8', (err, data) => {
        try {
            const dataAccount = JSON.parse(data);
            const filterAccount = dataAccount.filter(e => e.score <= 1004); //Show data score under 1004 with filter

            console.log(filterAccount);
            res.send(filterAccount);
        } catch (error) {
            res.send({ message: error.message });
        }
    })
}

//create data account 
export const createAccount = (req, res) => {
    //get the existing account data
    const existAccounts = getAccountData();

    //get the new account data from post request
    const accountData = req.body

    //check if the userData fields are missing
    if (accountData.username == null || accountData.email == null || accountData.password == null || accountData.score == null) {
        return res.status(401).send({ error: true, msg: 'User data missing' })
    }

    //check if the username exist already
    const findExist = existAccounts.find(user => user.username === accountData.username)
    if (findExist) {
        return res.status(409).send({ error: true, msg: 'username already exist' })
    }

    //append the account data
    existAccounts.push(accountData);

    //save the new account data
    saveUserData(existAccounts);
    res.send({ success: true, msg: 'account data added successfully' })

}

//update data account
export const updateAccountData = (req, res) => {
    //get username from url
    const username = req.params.username

    //get the update data
    const accountData = req.body

    //get the existing account data
    const existAccounts = getAccountData();

    //check if username exist or not
    const findExist = existAccounts.find( e => e.username === username )
    if (!findExist) {
        return res.status(409).send({error: true, message: "username not exist"})
    }

    //filter account data
    const updateAccount = existAccounts.filter(e => e.username !== username);

    //push update data
    updateAccount.push(accountData);

    //save data
    saveUserData(updateAccount);

    res.send({success: true, message: "Update account successfully"});
}

//remove data account
export const deleteAccountData = (req, res) => {
    //get username from url
    const username = req.params.username

    //get the existing account data
    const existAccounts = getAccountData();

    //filter the username and remove
    const filterAccount = existAccounts.filter( e => e.username !== username );

    if(existAccounts.length === filterAccount.length){
        return res.status(409).send({error: true, message: 'username not exist'})
    }

    //save the remove data
    saveUserData(filterAccount);

    res.send({success: true, message: 'Remove account successfully '})
}