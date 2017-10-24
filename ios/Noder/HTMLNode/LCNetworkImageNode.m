//
//  LCNetworkImageNode.m
//  Test
//
//  Created by bawn on 27/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import "LCNetworkImageNode.h"
#import "UIColor+LCColor.h"

@implementation LCNetworkImageNode

- (instancetype)init{
    self = [super init];
    if (self) {
        self.cornerRadius = 2.0f;
        self.clipsToBounds = YES;
        self.sizeRate = 4.0f/3.0f;
        self.backgroundColor = [UIColor lcPlaceholdColor];
    }
    return self;
}

@end
