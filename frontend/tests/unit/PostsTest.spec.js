import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Posts from "../../src/components/Posts.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

//Create dummy store
const store = new Vuex.Store({
    state: {
        user: {
            id: 1,
            firstname: 'test',
            lastname: 'test',
            email: 'test',
            avatar: 'test',
        }
    },
    getters: {
        user: (state) => state.user,
    }
});

//Create dummy routes
const routes = [
    {
        path: '/',
        name: 'posts',
    },
    {
        path: '/profiles',
        name: 'profiles'
    }
];

const router = new VueRouter({routes});

const testData = [
    {
        id: 1,
        text: "I think it's going to rain",
        createTime: "2020-12-05 13:53:23",
        likes: 0,
        liked: false,
        media: {
            url: "test-image.jpg",
            type: "image"
        },
        author: {
            id: 2,
            firstname: "Gordon",
            lastname: "Freeman",
            avatar: 'avatar.url'
        }
    },
    {
        id: 2,
        text: "Which weighs more, a pound of feathers or a pound of bricks?",
        createTime: "2020-12-05 13:53:23",
        likes: 1,
        liked: true,
        media: null,
        author: {
            id: 3,
            firstname: "Sarah",
            lastname: "Connor",
            avatar: 'avatar.url'
        }
    },
    {
        id: 4,
        text: null,
        createTime: "2020-12-05 13:53:23",
        likes: 3,
        liked: false,
        media: {
            url: "test-video.mp4",
            type: "video"
        },
        author: {
            id: 5,
            firstname: "Richard",
            lastname: "Stallman",
            avatar: 'avatar.url'
        }
    }
];

//Mock axios.get method that our Component calls in mounted event
jest.mock("axios", () => ({
    get: () => Promise.resolve({
        data: testData
    })
}));

describe('Posts', () => {

    const wrapper = mount(Posts, {router, store, localVue});

    it('1 == 1', function () {
        expect(true).toBe(true)
    });

    it('Correct amount of posts', function () {
        expect(testData.length).toEqual(wrapper.findAll('div.post').length);
    });

    it('image media types correct', function () {
        let posts = wrapper.findAll('div.post');
        let postWithImage = posts.at(0);

        expect(postWithImage.find('div.post-image').exists()).toBe(true);

        expect(postWithImage.find('div.post-image').find('img').exists()).toBe(true);
        expect(postWithImage.find('div.post-image').find('video').exists()).toBe(false);
    });

    it('null media types correct', function () {
        let posts = wrapper.findAll('div.post');
        let postWithNull = posts.at(1);

        expect(postWithNull.find('div.post-image').exists()).toBe(false);
    });

    it('video media types correct', function () {
        let posts = wrapper.findAll('div.post');
        let postWithVideo = posts.at(2);

        expect(postWithVideo.find('div.post-image').exists()).toBe(true);

        expect(postWithVideo.find('div.post-image').find('img').exists()).toBe(false);
        expect(postWithVideo.find('div.post-image').find('video').exists()).toBe(true);
    });
});