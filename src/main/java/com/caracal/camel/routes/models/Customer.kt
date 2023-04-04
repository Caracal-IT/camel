package com.caracal.camel.routes.models

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import java.util.UUID

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

@JsonIgnoreProperties(ignoreUnknown = true)
data class CustomerResponse(
    val id: UUID = UUID.randomUUID(),
    val name: String = "",
    val surname: String = "",
    val message: String = ""
)
