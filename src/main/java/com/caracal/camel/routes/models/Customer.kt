package com.caracal.camel.routes.models

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class Customer(
    val name: String = "",
    val surname: String = "",
    val age: Int = 0,
    val address: Address = Address())

data class Address(
    val street: String = "",
    val city: String = "",
    val state: String = "",
    val zip: String = "")
