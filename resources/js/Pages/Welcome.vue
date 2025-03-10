<script>
import {Head, Link} from '@inertiajs/vue3';

export default {
    components: {
        Head, Link
    },
    data() {
        return {
            modal_status: false,
            ticket_modal: false,
            selected_tour: null,
            modal_loading: false,
            ticket_number: null,
            booking_payload: {
                tour_id: null,
                slots: null,
                total_price: null,
                email_address: this.email_address,
                user_name: this.user_name
            }
        }
    },
    computed: {
        email_address() {
            return this.$page.props.auth.user?.email;
        },
        user_name() {
            return this.$page.props.auth.user?.name;
        },
        total_price() {
            return this.booking_payload.slots * this.selected_tour?.price;
        }
    },
    props: {
        canLogin: {
            type: Boolean,
        },
        tours: {
            type: Array,
        },
        canRegister: {
            type: Boolean,
        },
        laravelVersion: {
            type: String,
            required: true,
        },
        phpVersion: {
            type: String,
            required: true,
        },
    },
    methods: {
        handleImageError() {
            document.getElementById('screenshot-container')?.classList.add('!hidden');
            document.getElementById('docs-card')?.classList.add('!row-span-1');
            document.getElementById('docs-card-content')?.classList.add('!flex-row');
            document.getElementById('background')?.classList.add('!hidden');
        },

        showBookingModal(tour) {
            this.selected_tour = tour;
            this.booking_payload.tour_id = tour.id;
            this.modal_status = true;
        },

        bookTour() {

            this.start_loading();

            this.booking_payload.total_price = this.total_price;

            if(!this.booking_payload.slots || !this.booking_payload.user_name || !this.booking_payload.email_address){
                this.stop_loading();
                this.show_error_message("Please fill all fields");
                return;
            }

            axios.post(route('bookings.store'), this.booking_payload, {
                headers: {
                    'X-CSRF-TOKEN': this.$page.props.csrf_token
                }
            })
                .then(response => {
                    if(response.status === 201){
                        this.modal_loading = false;
                        this.show_success_message("Booking made successfully");

                        console.log(response.data)

                        this.ticket_number = response.data.ticket_number;
                        this.ticket_modal = true;

                        this.stop_loading();

                    }else{
                        this.modal_loading = false;
                        this.loading_error();
                        this.show_error_message(response.data.message);
                    }
                })
                .catch(error => {
                    this.modal_loading = false;
                    this.loading_error();
                    this.show_error_message("An error occurred. Please try again later.");
                })
        },
    }
}

</script>

<template>
    <Head title="Welcome"/>
    <div class="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <Modal
            v-model="modal_status"
            title="Book Tour"
            ok-text="Book Tour"
            :loading="modal_loading"
            cancel-text="Cancel"
            data-cy="book-tour-modal"
            @on-ok="bookTour"
            @on-cancel="modal_status">

            <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                <Input size="large" class="col-span-6" v-model="booking_payload.slots" type="number" placeholder="Please enter the number of slots you are booking." data-cy="input-slots" />
                <Input size="large" class="col-span-6" v-model="booking_payload.user_name" type="text" placeholder="Please enter the ticket holder name." data-cy="input-user-name" />
                <Input size="large" class="col-span-12" v-model="booking_payload.email_address" type="email" placeholder="Please enter your email address." data-cy="input-email-address" />
            </div>

            <div class="border-2 green rounded-md p-4 mt-4" data-cy="total-price">
                Total: KES {{ total_price }}
            </div>
        </Modal>


        <!--    Ticket modal-->
        <Modal
            v-model="ticket_modal"
            title="Ticket Details"
            ok-text="Done"
            cancel-text="Cancel"
            data-cy="ticket-modal"
            @on-ok="!ticket_modal">

            <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div class="col-span-12">
                    <p class="text-lg font-semibold" data-cy="ticket-number">Ticket Number: {{ ticket_number }}</p>
                    <p class="text-lg font-semibold" data-cy="ticket-holder">Ticket Holder: {{ booking_payload.user_name }}</p>
                    <p class="text-lg font-semibold" data-cy="ticket-email">Email Address: {{ booking_payload.email_address }}</p>
                    <p class="text-lg font-semibold" data-cy="ticket-tour">Tour: {{ selected_tour?.name }}</p>
                    <p class="text-lg font-semibold" data-cy="ticket-slots">Slots: {{ booking_payload.slots }}</p>
                    <p class="text-lg font-semibold" data-cy="ticket-total-price">Total Price: KES {{ this.total_price }}</p>
                </div>
            </div>
        </Modal>

        <div
            class="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white" data-cy="page-container">
            <div class="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                <header class="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                    <div class="flex lg:justify-center lg:col-start-2">
                        <svg class="h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]" viewBox="0 0 62 65" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z"
                                fill="currentColor"/>
                        </svg>

                        <img src="https://www.solutech.co.ke/wp-content/uploads/2020/10/Solutech-Official-Logo.svg" data-cy="company-logo">

                    </div>
                    <nav v-if="canLogin" class="-mx-3 flex flex-1 justify-end">
                        <Link
                            v-if="$page.props.auth.user"
                            :href="route('dashboard')"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            data-cy="dashboard-link"
                        >
                            Dashboard
                        </Link>

                        <template v-else>
                            <Link
                                :href="route('login')"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                data-cy="login-link"
                            >
                                Log in
                            </Link>

                            <a
                                href="https://bookings.test/docs/index.html"
                                target="_blank"
                                class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                data-cy="documentation-link"
                            >
                                Documentation
                            </a>

                        </template>
                    </nav>
                </header>

                <main class="min-h-96 mt-6" data-cy="tours-container">

                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <template v-for="tour in tours">
                            <div class="bg-white dark:bg-black dark:text-white/70 rounded-lg shadow-md overflow-hidden" data-cy="tour-card">
                                <div class="relative">
                                    <img
                                        src="https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA"
                                        alt="Tour image"
                                        class="object-cover w-full h-48"
                                        @error="handleImageError"
                                        data-cy="tour-image"
                                    />
                                    <div class="absolute inset-0 bg-black/50"></div>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <button @click="showBookingModal(tour)"
                                                class="bg-[#FF2D20] text-white px-4 py-2 rounded-lg"
                                                data-cy="book-tour-button">
                                                Book Tour
                                        </button>
                                    </div>
                                </div>
                                <div class="p-4">
                                    <h2 class="text-lg font-semibold" data-cy="tour-destination">Destination: {{ tour.destination.name }}</h2>
                                    <p class="text-sm text-gray-500" data-cy="tour-name">Tour name: {{ tour.name }}</p>
                                    <p class="text-sm text-gray-500" data-cy="tour-slots">{{ tour.slots }} slots available</p>
                                </div>
                            </div>
                        </template>

                    </div>

                </main>

                <footer
                    class="mt-8 py-4 text-center text-gray-500 dark:text-white/70 border-t border-gray-200 dark:border-gray-700">
                    <p>&copy; 2024 Solutech Ltd. All rights reserved.</p>
                </footer>
            </div>
        </div>
    </div>
</template>
