package com.caracal.camel.policies;

import org.apache.camel.processor.errorhandler.RedeliveryPolicy;

public class InfiniteRedeliveryPolicy extends RedeliveryPolicy {
    public InfiniteRedeliveryPolicy(){
        super();

        setMaximumRedeliveries(-1);
        setRedeliveryDelay(1000L);
        setAsyncDelayedRedelivery(true);
        setUseExponentialBackOff(false);
        setBackOffMultiplier(1);
        setMaximumRedeliveryDelay(1000L);
    }
}
