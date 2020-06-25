{
    "actions": [
        {
            "collect": {
                "name": "collectId",
                "questions": [
                    {
                        "question": "Please upload a picture of your Pan Card?",
                        "name": "id_card",
                        "type": "Twilio.MEDIA",
                        "validate": {
                            "allowed_types": {
                                "list": [
                                    "image/jpeg",
                                    "image/gif",
                                    "image/png",
                                    "image/bmp"
                                ]
                            }
                        }
                    },
                    {
                        "question": "Please upload a Selfie?",
                        "name": "selfie",
                        "type": "Twilio.MEDIA",
                        "validate": {
                            "allowed_types": {
                                "list": [
                                    "image/jpeg",
                                    "image/gif",
                                    "image/png",
                                    "image/bmp"
                                ]
                            }
                        }
                    }
                ],
                "on_complete": {
                    "redirect": "task://collectId"
                }
            }
        }
    ],
    "d": {
        "time": "2020-06-25",
        "full_name": "gaurav kumar sahoo",
        "user_id": "O0VMCJYyXzw",
        "mid_name": "kumar",
        "mob_number": "384743838",
        "application_status": "Pending",
        "reg_type": "user",
        "first_name": "gaurav",
        "city": "bbsr",
        "last_name": "sahoo"
    }
}
