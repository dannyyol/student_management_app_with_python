<template>
    <div class="container">
        <!-- <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">User Component</div>

                    <div class="card-body">
                        I'm an example component.
                    </div>
                </div>
            </div>
        </div> -->
        
        <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                    <button class="btn btn-primary" @click = "newModal">Add New <i class="fa fa-user-plus fa-fw" aria-hidden="true"></i></button>
                  <!-- <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                    <div class="input-group-append">
                      <button type="submit" class="btn btn-default"><i class="fas fa-search"></i></button>
                    </div>
                  </div> -->
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registered At</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for = "user in users" :key = "user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.type | upText}}</td>
                      <td>{{user.created_at | myDate}}</td>
                      
                      <!-- <td><span class="tag tag-success">Approved</span></td> -->
                      <td>
                          <a href="#" @click="editModal(user)">
                              <i class="fas fa-edit"></i>
                          </a>
                          /
                          <a href="#" @click = "deleteUser(user.id)">
                              <i class="fas fa-trash" style="color:red;"></i>
                          </a>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>


            <!-- Button trigger modal -->
   
    <!-- Modal -->
    <div class="modal fade"  id="AddNew" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode">Create User</h5>
                    <h5 class="modal-title" v-show="editMode"> Update User's Information</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div>
                  <form @submit.prevent="editMode ? updateUser():createUser()">  
                    <div class="modal-body">
                      
                        <div class="form-group">
                          <input v-model="form.name" type="text" name="name"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('name') }" placeholder ="Enter name">
                          <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                          <input v-model="form.email" type="text" name="email"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('email') }" placeholder ="Enter email">
                          <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                          <textarea v-model="form.bio" type="text" name="bio"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }" placeholder ="Enter Bio">
                          </textarea>
                          <has-error :form="form" field="bio"></has-error>
                        </div>

                        <div class="form-group">
                          <select name="type" v-model = "form.type" id="type" class="form-control" 
                          :class="{ 'is-invalid': form.errors.has('type') }">
                            <option value=""> Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="author">Author</option>

                          </select>
                          <has-error :form="form" field="type"></has-error>
                        </div>

                        <div class="form-group">
                          <input v-model="form.password" type="text" name="password"
                            class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                          <has-error :form="form" field="password"></has-error>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="submit" v-show="editMode" class="btn btn-success">Update</button>
                        <button type="submit" v-show="!editMode" class="btn btn-primary">Create</button>

                    </div>
                  </form>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
      data(){
        return {
          editMode : true,
          users : {},

          form: new Form({
            id : '',
            name : '',
            email: '',
            password: '',
            type: '',
            bio: '',
            photo: ''
          })
        }
      },
      methods: {
        updateUser(){
          // console.log('edit me')
          this.$Progress.start()
          this.form.put('api/user/' + this.form.id)
          .then(()=>{
            //Success Message
            $('#AddNew').modal('hide');
            swal.fire(
              'Updated!',
              'Information has been updated.',
              'success'
            )
            this.$Progress.finish();
            Fire.$emit('after-created');
          })
          .catch(()=>{
            this.$Progress.fail()
            
          });
        },
        editModal(user){
          this.editMode = true,
          this.form.reset() // form.reset() is vform function
          $('#AddNew').modal('show');
          this.form.fill(user);
        },

        newModal(){
          this.editMode = false,
          this.form.reset() // form.reset() is vform function
          $('#AddNew').modal('show');
        },
        // delete a User
        deleteUser(id){
          swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {

            // will send request to the server
            if (result.value) {
              this.form.delete('api/user/'+id).then(()=>{
                swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                Fire.$emit('after-created');
                
              }).catch(()=>{
                  swal.fire("Failed", "There was something wrong", "warning");
              });
            }
        })

        },

        loadusers(){
          // preloader
          let loader = this.$loading.show({
            // Optional parameters
            container: this.fullPage ? null : this.$refs.formContainer,
            canCancel: true,
            onCancel: this.onCancel,
          });
          // simulate AJAX
          setTimeout(() => {
            loader.hide()
          },2000)  
          axios.get('api/user').then(( {data} ) => (this.users = data.data ));
        },

        createUser(){
          this.$Progress.start();
          this.form.post('api/user');
          then(() =>{
            Fire.$emit('after-created'); //load all users after creating user
            $('#AddNew').modal('hide');
    
            toast.fire({
              type:'success',
              title: 'User created successfully' 
            })
            this.$Progress.finish();
          })
          .catch(() => {

          })
          
        }
      },
        created() {
            this.loadusers()
            Fire.$on('after-created', () => {
              this.loadusers();
            });
        }
    }
</script>
