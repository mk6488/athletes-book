<template>
  <section class="flex flex-wrap w-full">
    <div class="m-auto">
      <h1 class="text-4xl my-5 text-center text-indigo-700">Comments</h1>
      <!-- Athlete Buttons -->
      <div class="flex flex-wrap">
        <div
          class="w-1/5 h-12 p-1"
          v-for="athlete in state.athletes"
          :key="athlete.firstName"
        >
          <button
            @click="athletePressed(athlete)"
            class="w-full h-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
          >
            {{ athlete.firstName }}
          </button>
        </div>
      </div>

      <!-- List of Comments -->
      <div class="mt-10">
        <div class="flex justify-between mb-2">
          <h1 class="text-indigo-700 p-2">Latest Comments</h1>
          <h2 class="text-white bg-indigo-400 rounded-full p-2">
            {{ commentsCount }}
          </h2>
        </div>
        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="w-full border-separate border border-green-800">
          <thead>
            <tr>
              <th class="border border-indigo-600 px-2">Date</th>
              <th class="border border-indigo-600 px-2">Week #</th>
              <th class="border border-indigo-600 px-2">Athlete</th>
              <th class="border border-indigo-600 px-2">Type</th>
              <th class="border border-indigo-600 px-2">Comment</th>
              <th class="border border-indigo-600 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="comment in state.comments" :key="comment.id">
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ correctDate(comment.commentDate) }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ comment.weekNumber }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                {{ comment.athleteName }}
              </td>
              <td
                class="border border-indigo-600 text-center text-xs px-2"
                :class="[
                  comment.commentType === 'Incident' ? 'bg-red-200' : '',
                  comment.commentType === 'Medical' ? 'bg-yellow-200' : '',
                  comment.commentType === 'General' ? 'bg-green-200' : '',
                ]"
              >
                {{ comment.commentType }}
              </td>
              <td class="border border-indigo-600 text-xs px-2">
                {{ comment.comment }}
              </td>
              <td class="border border-indigo-600 text-center text-xs px-2">
                <div class="flex justify-evenly">
                  <button>
                    <i
                      class="fa fa-pencil text-yellow-500"
                      @click="updatePressed(comment)"
                    ></i>
                  </button>
                  <button>
                    <i
                      class="fas fa-trash text-red-800"
                      @click="deletePressed(comment._id)"
                    ></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <teleport to="body">
      <CommentModal
        v-if="modalIsOpen"
        @close="modalIsOpen = false"
        @fetch="reloadData"
        :athleteData="selectedAthlete"
      />
      <UpdateCommentModal
        v-if="updateModalIsOpen"
        @close="updateModalIsOpen = false"
        @fetch="reloadData"
        :commentData="selectedComment"
      />
    </teleport>
  </section>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import CommentModal from "../components/CommentModal";
import UpdateCommentModal from "../components/UpdateCommentModal";
import CommentService from "../services/CommentService";
import AthleteService from "../services/AthleteService";

export default {
  components: { CommentModal, UpdateCommentModal },
  setup() {
    const state = reactive({
      comments: [],
      athletes: {},
    });
    const error = ref("");
    const selectedAthlete = ref({});
    const selectedComment = ref({});
    const modalIsOpen = ref(false);
    const updateModalIsOpen = ref(false);

    const commentsCount = computed({
      get: () => state.comments.length,
    });

    const correctDate = (date) => {
      const parts = date.split("/");
      return parts[2] + "/" + parts[1] + "/" + parts[0];
    };

    const reloadData = async () => {
      state.comments = await CommentService.getAll();
    };

    const athletePressed = (name) => {
      modalIsOpen.value = true;
      selectedAthlete.value = name;
    };

    const updatePressed = (comment) => {
      selectedComment.value = comment;
      updateModalIsOpen.value = true;
    };

    const deletePressed = async (id) => {
      await CommentService.deleteOne(id);
      state.comments = await CommentService.getAll();
    };

    onMounted(async () => {
      try {
        state.athletes = await AthleteService.getAllActive();
        state.comments = await CommentService.getAll();
      } catch (err) {
        error.value = err.message;
      }
    });

    return {
      state,
      error,
      selectedAthlete,
      selectedComment,
      modalIsOpen,
      updateModalIsOpen,
      commentsCount,
      correctDate,
      reloadData,
      athletePressed,
      updatePressed,
      deletePressed,
    };
  },
};
</script>

<style>
</style>