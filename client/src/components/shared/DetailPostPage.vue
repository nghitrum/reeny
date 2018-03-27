<template>
  <div>
    <div class="heading-container">
      <div>
        <div class="votes">
          {{post.rating}}
        </div>
        <div>
          <div class="title">
            {{post.title}}
          </div>
          <div>
            posted by {{post.user}}
          </div>
        </div>
      </div>
      <div>
        <div>{{post.rating}} </div>
        <div>{{post.createdAt}} </div>
      </div>
    </div>

    <div class="picture-container">{{post.images}} </div>
    <div class="text-body">{{post.content}} </div>
    <div>{{post.tags}} </div>
  </div>
</template>
