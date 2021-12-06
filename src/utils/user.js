import users from './../data/users'

export default function userData ( id ) {
    const user = users.find( ( user ) => user.id === Number( id ) )
    return user && user.name;
}